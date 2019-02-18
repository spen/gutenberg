# Internationalization (i18n)

Internationalization utilities for client-side localization. See [How to Internationalize Your Plugin](https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/) for server-side documentation.

For a complete example, see the [Internationalization section of the Gutenberg Handbook](https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization.md).

## Installation

Install the module:

```bash
npm install @wordpress/i18n --save
```

_This package assumes that your code will run in an **ES2015+** environment. If you're using an environment that has limited or no support for ES2015+ such as lower versions of IE then using [core-js](https://github.com/zloirock/core-js) or [@babel/polyfill](https://babeljs.io/docs/en/next/babel-polyfill) will add support for these methods. Learn more about it in [Babel docs](https://babeljs.io/docs/en/next/caveats)._

## Usage

```js
import { sprintf, _n } from '@wordpress/i18n';

sprintf( _n( '%d hat', '%d hats', 4, 'text-domain' ), 4 );
// 4 hats
```


## Build and Usage

You can use the [wp-cli utility](https://wp-cli.org/) to generate a `.pot` file containing all your localized strings.

```sh
wp i18n make-pot ./src myplugin.pot
```

Use the [po2json](https://github.com/mikeedwards/po2json) npm module to convert a po file to the proper Jed json format.

```sh
po2json myplugin-eo.po myplugin-eo.json -f jed
```

Use the [wp_set_script_translations](https://developer.wordpress.org/reference/functions/wp_set_script_translations/) function to load the json translation file.

```php
wp_set_script_translations( 'myplugin-script', 'myplugin', plugin_dir_path( __FILE__ ) . 'languages' );
```


## API

`__( text: string, domain: string ): string`

Retrieve the translation of text.

See: https://developer.wordpress.org/reference/functions/__/

`_x( text: string, context: string, domain: string ): string`

Retrieve translated string with gettext context.

See: https://developer.wordpress.org/reference/functions/_x/

`_n( single: string, plural: string, number: Number, domain: string ): string`

Translates and retrieves the singular or plural form based on the supplied number.

See: https://developer.wordpress.org/reference/functions/_n/

`_nx( single: string, plural: string, number: Number, context: string, domain: string ): string`

Translates and retrieves the singular or plural form based on the supplied number, with gettext context.

See: https://developer.wordpress.org/reference/functions/_nx/

`sprintf( format: string, ...args: mixed[] ): string`

Returns a formatted string.

See: http://www.diveintojavascript.com/projects/javascript-sprintf

`setLocaleData( data: Object, domain: string )`

Creates a new Jed instance with specified locale data configuration.

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
