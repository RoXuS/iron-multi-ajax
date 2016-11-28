iron-multi-ajax web component
============

[![Build Status](https://travis-ci.org/RoXuS/iron-multi-ajax.svg?branch=master)](https://travis-ci.org/RoXuS/iron-multi-ajax)

`iron-multi-ajax` is an `iron-ajax` element which can use multi urls.

See the [component page](https://roxus.github.io/iron-multi-ajax/components/iron-multi-ajax/#iron-multi-ajax) for more information.

```html
<link rel="import" href="bower_components/iron-multi-ajax/dist/iron-multi-ajax.html">

<iron-ajax auto urls="[[aArrayOfUrls]]" last-response="{{data}}"></iron-ajax>

// sync version
<iron-ajax sync auto urls="[[aArrayOfUrls]]" last-response="{{data}}"></iron-ajax>
```

## Install

```
$ bower install iron-multi-ajax --save
```

## Serve component 

```
$ polymer serve --open
```

## Running Tests

```
$ polymer test
```

## Build dist

```
$ npm install
$ gulp build
```

## Development

To build the project on changes in the src folder
```
$ gulp watch
```

## License
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3 of the License as published by the Free Software Foundation.
