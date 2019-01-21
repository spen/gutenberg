/**
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import {
	Button,
	IconButton,
	PanelBody,
	Path,
	Placeholder,
	SelectControl,
	SVG,
	Toolbar,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	ServerSideRender,
} from '@wordpress/editor';

import WidgetEditHandler from './WidgetEditHandler';

class LegacyWidgetEdit extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isPreview: false,
		};
		this.switchToEdit = this.switchToEdit.bind( this );
		this.switchToPreview = this.switchToPreview.bind( this );
		this.changeWidget = this.changeWidget.bind( this );
	}

	render() {
		const { attributes, availableLegacyWidgets, setAttributes } = this.props;
		const { isPreview } = this.state;
		const { identifier } = attributes;
		const widgetObject = identifier && availableLegacyWidgets[ identifier ];
		if ( ! widgetObject ) {
			return (
				<Placeholder
					icon={ <BlockIcon icon="admin-customizer" /> }
					label={ __( 'Legacy Widget' ) }
				>
					<SelectControl
						label={ __( 'Select a legacy widget to display:' ) }
						value={ identifier || 'none' }
						onChange={ ( value ) => setAttributes( {
							instance: {},
							identifier: value,
						} ) }
						options={ [ { value: 'none', label: 'Select widget' } ].concat(
							map( availableLegacyWidgets, ( widget, key ) => {
								return {
									value: key,
									label: widget.name,
								};
							} )
						) }
					/>
				</Placeholder>
			);
		}
		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<IconButton
							className="editor-block-switcher__toggle"
							onClick={ this.changeWidget }
							label={ __( 'Change widget' ) }
						>
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<Path d="M6.5 8.9c.6-.6 1.4-.9 2.2-.9h6.9l-1.3 1.3 1.4 1.4L19.4 7l-3.7-3.7-1.4 1.4L15.6 6H8.7c-1.4 0-2.6.5-3.6 1.5l-2.8 2.8 1.4 1.4 2.8-2.8zm13.8 2.4l-2.8 2.8c-.6.6-1.3.9-2.1.9h-7l1.3-1.3-1.4-1.4L4.6 16l3.7 3.7 1.4-1.4L8.4 17h6.9c1.3 0 2.6-.5 3.5-1.5l2.8-2.8-1.3-1.4z" />
							</SVG>
						</IconButton>
						<IconButton
							className="components-icon-button components-toolbar__control"

							onClick={ this.changeWidget }
							icon="edit"
						/>
						<Button
							className={ `components-tab-button ${ ! isPreview ? 'is-active' : '' }` }
							onClick={ this.switchToEdit }
						>
							<span>{ __( 'Edit' ) }</span>
						</Button>
						<Button
							className={ `components-tab-button ${ isPreview ? 'is-active' : '' }` }
							onClick={ this.switchToPreview }
						>
							<span>{ __( 'Preview' ) }</span>
						</Button>
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ widgetObject.name }>
						{ widgetObject.description }
					</PanelBody>
				</InspectorControls>
				{ ! isPreview && (
					<WidgetEditHandler
						identifier={ attributes.identifier }
						instance={ attributes.instance }
						onInstanceChange={
							( newInstance ) => {
								this.props.setAttributes( {
									instance: newInstance,
								} );
							}
						}
					/>
				) }
				{ isPreview && (
					<ServerSideRender
						className="wp-block-legacy-widget__preview"
						block="core/legacy-widget"
						attributes={ attributes }
					/>
				) }
			</Fragment>
		);
	}

	changeWidget() {
		this.switchToEdit();
		this.props.setAttributes( {
			instance: {},
			identifier: undefined,
		} );
	}

	switchToEdit() {
		this.setState( { isPreview: false } );
	}

	switchToPreview() {
		this.setState( { isPreview: true } );
	}
}

export default withSelect( ( select ) => {
	const editorSettings = select( 'core/editor' ).getEditorSettings();
	const { availableLegacyWidgets } = editorSettings;
	return {
		availableLegacyWidgets,
	};
} )( LegacyWidgetEdit );
