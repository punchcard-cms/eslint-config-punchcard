# eslint-config-punchcard [![Build Status](https://travis-ci.org/punchcard-cms/eslint-config-punchcard.svg?branch=master)](https://travis-ci.org/punchcard-cms/eslint-config-punchcard)

Punchcard CMS ESLint Config

The place to start for the Punchcard JavaScript Style Guide is the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). We follow the Airbnb Style Guide with the following modifications, presented below. Most modifications are clarifications of existing rules where Airbnb does not specify anything, or expanding the existing rules for additional usecases we have.

## Best Practices

### Curly Brace Conventions

Curly braces should never omitted, even when they are optional.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [curly](http://eslint.org/docs/rules/curly) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
if (foo) {
  foo++;
}

while (bar) {
  baz();
}

if (foo) {
  baz();
} else {
  qux();
}

//////////////////////////////
// Not OK
//////////////////////////////
if (foo) foo++; /*error Expected { after 'if' condition.*/

while (bar)     /*error Expected { after 'while' condition.*/
  baz();

if (foo) {      /*error Expected { after 'else'.*/
  baz();
} else qux();
```

### Enforce Newline Before and After Dot

New lines must come before dots for properties

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [dot-location](http://eslint.org/docs/rules/dot-location) | `[2, 'property']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var foo = object
.property;
var bar = object.property;

//////////////////////////////
// Not OK
//////////////////////////////
var foo = object. /*error Expected dot to be on same line as property.*/
property;
```

### No Invalid This

No usage of `this` outside of classes or class-like objects

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
function Foo() {

//this is in a legacy style constructor.
  this.a = 0;
  baz(() => this);
}

class Foo {
  constructor() {

// this is in a constructor.
    this.a = 0;
    baz(() => this);
  }
}

var obj = {
  foo: function foo() {

// this is in a method (this function is on object literal).
    this.a = 0;
  }
};

//////////////////////////////
// Not OK
//////////////////////////////
this.a = 0;            /*error Unexpected `this`.*/
baz(() => this);       /*error Unexpected `this`.*/

(function() {
  this.a = 0;        /*error Unexpected `this`.*/
  baz(() => this);   /*error Unexpected `this`.*/
})();

function foo() {
  this.a = 0;        /*error Unexpected `this`.*/
  baz(() => this);   /*error Unexpected `this`.*/
}
```

### No Iterator

No usage of the `__iterator__` property on item's prototype.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-iterator](http://eslint.org/docs/rules/no-iterator) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var __iterator__ = foo; // Not using the `__iterator__` property.

//////////////////////////////
// Not OK
//////////////////////////////
Foo.prototype.__iterator__ = function() { /*error Reserved name '__iterator__'.*/
  return new FooIterator(this);
};

foo.__iterator__ = function () {};        /*error Reserved name '__iterator__'.*/

foo["__iterator__"] = function () {};     /*error Reserved name '__iterator__'.*/
```

## Node

### Return After Callback

Always return a `callback()` if it's called outside the main function body.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [callback-return](http://eslint.org/docs/rules/callback-return) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
function foo() {
  if (err) {
    return callback(err);
  }
  callback();
}

//////////////////////////////
// Not OK
//////////////////////////////
function foo() {
  if (err) {
    callback(err); /*error Expected return with your callback function.*/
  }
  callback();
}
```

### Global Require

All `require()` statements must be at the top-level module scope.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [global-require](http://eslint.org/docs/rules/global-require) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
// all these variations of require() are ok
require('x');
var y = require('y');
var z;
z = require('z').initialize();

// requiring a module and using it in a function is ok
var fs = require('fs');
function readFile(filename, callback) {
    fs.readFile(filename, callback)
}

//////////////////////////////
// Not OK
//////////////////////////////
// calling require() inside of a function is not allowed
function readFile(filename, callback) {
  var fs = require('fs');                                /*error Unexpected require().*/
  fs.readFile(filename, callback)
}

// conditional requires like this are also not allowed
if (DEBUG) { require('debug'); }                           /*error Unexpected require().*/

// a require() in a switch statement is also flagged
switch(x) { case '1': require('1'); break; }  
```

### Handle Callback Error

All errors must be handled in function callbacks and not allowed to fall through or "get eaten".

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
function loadData (err, data) {
  if (err) {
    console.log(err.stack);
  }
  doSomething();
}

function generateError (err) {
  if (err) {}
}

//////////////////////////////
// Not OK
//////////////////////////////
function loadData (err, data) { /*error Expected error to be handled.*/
  doSomething();
}
```

### No Mixed Requires

Do not mix require requires statements. Group [`core module`](http://nodejs.org/api/modules.html#modules_core_modules) requires separate from requires from [`file module`](http://nodejs.org/api/modules.html#modules_file_modules) requires, installed [`module`](http://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders) requires, `computed` module requires, `uninitialized` declarations, and any `other` declarations.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-mixed-requires](http://eslint.org/docs/rules/no-mixed-requires) | `[2, true]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
// only non-require declarations
var foo = 42,
    bar = 'baz';

// always valid regardless of grouping because all declarations are of the same type
var foo = require('foo' + VERSION),
    bar = require(getBarModuleName()),
    baz = require();

//////////////////////////////
// Not OK
//////////////////////////////
// invalid because of mixed types "core" and "file"
var fs = require('fs'),                /*error Do not mix core, module, file and computed requires.*/
    async = require('async');

// invalid because of mixed types "file" and "unknown"
var foo = require('foo'),              /*error Do not mix core, module, file and computed requires.*/
    bar = require(getBarModuleName());
```

### Disallow New Require

Disallow the use of `new` directly with a `require()` statement.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-new-require](http://eslint.org/docs/rules/no-new-require) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var AppHeader = require('app-header');

//////////////////////////////
// Not OK
//////////////////////////////
var appHeader = new require('app-header'); /*error Unexpected use of new with require.*/
```

### No Path Concat

Require the use of `path.join()` to create paths, disallowing simple string concatenation to do so, when using `__dirname` and `__filename`

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-path-concat](http://eslint.org/docs/rules/no-path-concat) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var fullPath = dirname + '/foo.js';

var fullPath = path.resolve(__dirname, 'foo.js');

var fullPath = path.join(__filename, 'foo.js');

//////////////////////////////
// Not OK
//////////////////////////////
var fullPath = __dirname + '/foo.js';  /*error Use path.join() or path.resolve() instead of + to create paths.*/

var fullPath = __filename + '/foo.js'; /*error Use path.join() or path.resolve() instead of + to create paths.*/
```

### No Process Exit

Disallow using `process.exit()`.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [no-process-exit](http://eslint.org/docs/rules/no-process-exit) | `[2]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
Process.exit();
var exit = process.exit;

//////////////////////////////
// Not OK
//////////////////////////////
process.exit(1); /*error Don't use process.exit(); throw an error instead.*/
process.exit(0); /*error Don't use process.exit(); throw an error instead.*/
```

## Style

### Brace Style

Always use Stroustrup style bracing, and never allow a single single line blocks.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [brace-style](http://eslint.org/docs/rules/brace-style) | `[2, 'stroustrup', {'allowSingleLine': true}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
function foo() {
  return true;
}

if (foo) {
  bar();
}
else {
  baz();
}

//////////////////////////////
// Not OK
//////////////////////////////
function foo()
{
  return true;
}

if (foo) {
  bar();
} else {
  baz();
}

if (foo) { bar(); }
```

### Camelcase

Always require camelCase naming, even in property names

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [camelcase](http://eslint.org/docs/rules/camelcase) | `[2, {'properties': 'always'}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var myFavoriteColor   = "#112C85";
var _myFavoriteColor  = "#112C85";
var myFavoriteColor_  = "#112C85";
var MY_FAVORITE_COLOR = "#112C85";
var foo = bar.baz_boom;
var foo = { qux: bar.baz_boom };

obj.do_something();

//////////////////////////////
// Not OK
//////////////////////////////
var my_favorite_color = "#112C85"; /*error Identifier 'my_favorite_color' is not in camel case.*/

function do_something() {          /*error Identifier 'do_something' is not in camel case.*/
    // ...
}

obj.do_something = function() {    /*error Identifier 'do_something' is not in camel case.*/
    // ...
};

var obj = {
    my_pref: 1                     /*error Identifier 'my_pref' is not in camel case.*/
};
```

### Consistent This

If you need to track `this` for nested context, always use a variable named `_this`;

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [consistent-this](http://eslint.org/docs/rules/consistent-this) | `[2, '_this']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var _this = this;
var self = 64;
var that = 42;
var that;

_this = this;

foo.bar = this;

//////////////////////////////
// Not OK
//////////////////////////////
var _this = 42;   /*error Designated alias '_this' is not assigned to 'this'.*/

var that = this; /*error Unexpected alias 'that' for 'this'.*/

_this = 42;       /*error Designated alias '_this' is not assigned to 'this'.*/

that = this;     /*error Unexpected alias 'that' for 'this'.*/
```

### Function Style

Always declare functions as expressions, never as a declaration

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [func-style](http://eslint.org/docs/rules/func-style) | `[2, 'expression']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var foo = function() {
    // ...
};

const bar = () => {};

//////////////////////////////
// Not OK
//////////////////////////////
function foo() {  /*error Expected a function expression.*/
    // ...
}
```

### Indentation

Always indent with two spaces. When writing multiple declarations of `var` and `let` with one keyword, and `switch` statement keywords, indent twice.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [indent](http://eslint.org/docs/rules/indent) | `[2, 2, {'VariableDeclarator': {'var': 2}, 'SwitchCase': 2}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var foo,
    bar,
    baz;

//////////////////////////////
// Not OK
//////////////////////////////
var foo,
  bar,
  baz;
```

### Linebreak Style

Always use `unix` linebreaks

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [linebreak-style](http://eslint.org/docs/rules/linebreak-style) | `[2, 'unix']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var a = 'a', // \n
    b = 'b'; // \n
// \n
function foo(params) {// \n
    // do stuff \n
}// \n

//////////////////////////////
// Not OK
//////////////////////////////
var a = 'a'; // \r\n /*error Expected linebreaks to be 'LF' but found 'CRLF'.*/

var a = 'a', // \r\n /*error Expected linebreaks to be 'LF' but found 'CRLF'.*/
    b = 'b'; // \n
```

### Lines Around Comments

Always require a new line before a comment. Comments starting new blocks, objects, or arrays do not need a new line before them

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment) | `[2, {'beforeBlockComment': true, 'beforeLineComment': true, 'allowBlockStart': true, 'allowObjectStart': true, 'allowArrayStart': true}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var foo = function () {
  // This comment is OK
  bar();

  /* This comment is OK too */
  baz();

  // This comment is awesome
  qux();

  const waldo = {
    /* This is cool */
    shirt: stripes
  };

  let garfield = [
    // As is this
    'fat',
    'cat'
  ];
}

//////////////////////////////
// Not OK
//////////////////////////////
var foo = function () {
  bar();
  /* This comment is Not OK */
  baz();
  // This comment is not awesome
  qux();
}
```

### Max Depth

Be cautious of nesting expressions more than 4 levels deep

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [max-depth](http://eslint.org/docs/rules/max-depth) | `[1, 4]` |  _warning_ |

```javascript
//////////////////////////////
// Okay
//////////////////////////////
var foo = function() {
  for (;;) { // Nested 1 deep.
    if (true) { // Nested 2 deep.
      if (true) { // Nested 3 deep.
        if (true) { // Nested 4 deep

        }
      }
    }
  }
}

//////////////////////////////
// Not OK
//////////////////////////////
var foo = function() {
  for (;;) { 
    if (true) { 
      if (true) { 
        if (true) { 
          if (true) {   /*error Blocks are nested too deeply (4).*/

          }
        }
      }
    }
  }
}
```

### One Variable Declaration

Use only a single declaration when creating `var` and `let` variables. Always create individual `const` variables.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [one-var](http://eslint.org/docs/rules/one-var) | `[2, {'var': 'always', 'let': 'never', 'const': 'never'}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var foo = function () {
  var bar,
      baz;

  let qux;

  const waldo;
}

//////////////////////////////
// Not OK
//////////////////////////////
var foo = function () {
  var bar;
  var baz;      /*error Combine this with the previous 'let' statement.*/

  let qux,      /*error Split 'let' declarations into multiple statements.*/
      quarx;

  const waldo;  /*error Split 'const' declarations into multiple statements.*/
}
```

### Padded Blocks

Never pad your blocks with beginning or ending spaces

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [padded-blocks](http://eslint.org/docs/rules/padded-blocks) | `[2, 'never']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
if (a) {
  b();
}

//////////////////////////////
// Not OK
//////////////////////////////
if (a) {  /*error Block must not be padded by blank lines.*/

  b();
}         /*error Block must not be padded by blank lines.*/

if (a) {  /*error Block must not be padded by blank lines.*/
  
  b();

}         /*error Block must not be padded by blank lines.*/

if (a) {  /*error Block must not be padded by blank lines.*/
  b();

}         /*error Block must not be padded by blank lines.*/
```

### Quote Properties

Keep property quoting consistent within an object.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [quote-props](http://eslint.org/docs/rules/quote-props) | `[2, 'consistent']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
var object = {
  'foo': 'bar',
  'baz': 42,
  'qux': true
};

var object = {
  foo: 'bar',
  baz: 42,
  qux: true
};

// Need quotes for everything because `qux-lorem` requires quotes
var object = {
  'foo': 'bar',
  'baz': 42,
  'qux-lorem': true
};

//////////////////////////////
// Not OK
//////////////////////////////
var object = {
  foo: 'bar',
  baz: 42,
  'qux-lorem': true
};

var object = {
  foo: 'bar',
  baz: 42,
  'qux': true
};
```

### Space Before Keywords

Always include a space before a keyword if it is not the first item in a line.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [space-before-keywords](http://eslint.org/docs/rules/space-before-keywords) | `[2, 'always']` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
if (foo) {
    // ...
} else {}

(function() {})()

<Foo onClick={function bar() {}} />

for (let foo of ['bar', 'baz', 'qux']) {}

//////////////////////////////
// Not OK
//////////////////////////////
if (foo) {
    // ...
}else {}                           /*error Missing space before keyword "else".*/

const foo = 'bar';let baz = 'qux'; /*error Missing space before keyword "let".*/

var foo =function bar () {}        /*error Missing space before keyword "function".*/

function bar() {
    if (foo) {return; }            /*error Missing space before keyword "return".*/
}
```

### Spaces Before/After Unary Operations

Always include a space around unary word operators (such as `new`, `delete`, `typeof`, `void`, `yield`), but not around nonword operators (such as `-`, `+`, `--`, `++`, `!`, `!!`).

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [space-unary-ops](http://eslint.org/docs/rules/space-unary-ops) | `[2, {'words': true, 'nonwords': false}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////
// Word unary operator "delete" is followed by a whitespace.
delete foo.bar;

// Word unary operator "new" is followed by a whitespace.
new Foo;

// Word unary operator "void" is followed by a whitespace.
void 0;

// Unary operator "++" is not followed by whitespace.
++foo;

// Unary operator "--" is not preceeded by whitespace.
foo--;

// Unary operator "-" is not followed by whitespace.
-foo;

// Unary operator "+" is not followed by whitespace.
+"3";

//////////////////////////////
// Not OK
//////////////////////////////
typeof!foo;        /*error Unary word operator "typeof" must be followed by whitespace.*/

void{foo:0};       /*error Unary word operator "void" must be followed by whitespace.*/

new[foo][0];       /*error Unary word operator "new" must be followed by whitespace.*/

delete(foo.bar);   /*error Unary word operator "delete" must be followed by whitespace.*/

function *foo() {
    yield(0)       /*error Unary word operator "yield" must be followed by whitespace.*/
}

++ foo;            /*error Unexpected space after unary operator "++".*/

foo --;            /*error Unexpected space before unary operator "--".*/

- foo;             /*error Unexpected space after unary operator "-".*/

+ "3";             /*error Unexpected space after unary operator "+".*/
```

## Space

Always require a space after an initializing a comment with `//` or `/*`. Characters `-`, `+`, `/`, and `*` do not need any spacing and are _exceptions_. Characters `=` and `!` do not need a space before them, but need a space after them, and are _markers_.

| Rule | Settings | Type |
| ---: | :------- | :--: |
| [spaced-comment](http://eslint.org/docs/rules/spaced-comment) | `[2, 'always', {'exceptions': ['-', '+', '/', '*'], 'markers': ['=', '!']}]` |  _error_ |

```javascript
//////////////////////////////
// OK
//////////////////////////////

//--------------
// Comment block
//--------------

//++++++++++++++
// Comment block
//++++++++++++++

////////////////
// Comment block
////////////////

/****************
 * Comment block
 ****************/

//= This is a comment with a marker
//! This is a comment with a marker

//////////////////////////////
// Not OK
//////////////////////////////

//=This is a comment with a marker    /*error Expected space or tab after // in comment.*/
//!This is a comment with a marker    /*error Expected space or tab after // in comment.*/

/*-+-+-+-+-+-+-+*/     /*error Expected space or tab after /* in comment.*/
// Comment block
/*-+-+-+-+-+-+-+*/     /*error Expected space or tab after /* in comment.*/

/*------++++++++*/     /*error Expected exception block, space or tab after /* in comment.*/
/* Comment block */
/*------++++++++*/     /*error Expected exception block, space or tab after /* in comment.*/
```

## Summary of Changes

### Best Practices
| Rule | Settings | Type |
| ---: | :------- | :--: |
| [curly](http://eslint.org/docs/rules/curly) | `[2]` |  _error_ |
| [dot-location](http://eslint.org/docs/rules/dot-location) | `[2, 'property']` |  _error_ |
| [no-invalid-this](http://eslint.org/docs/rules/no-invalid-this) | `[2]` |  _error_ |
| [no-iterator](http://eslint.org/docs/rules/no-iterator) | `[2]` |  _error_ |

### Node
| Rule | Settings | Type |
| ---: | :------- | :--: |
| [callback-return](http://eslint.org/docs/rules/callback-return) | `[2]` |  _error_ |
| [global-require](http://eslint.org/docs/rules/global-require) | `[2]` |  _error_ |
| [handle-callback-err](http://eslint.org/docs/rules/handle-callback-err) | `[2]` |  _error_ |
| [no-mixed-requires](http://eslint.org/docs/rules/no-mixed-requires) | `[2, true]` |  _error_ |
| [no-new-require](http://eslint.org/docs/rules/no-new-require) | `[2]` |  _error_ |
| [no-path-concat](http://eslint.org/docs/rules/no-path-concat) | `[2]` |  _error_ |
| [no-process-exit](http://eslint.org/docs/rules/no-process-exit) | `[2]` |  _error_ |

### Style
| Rule | Settings | Type |
| ---: | :------- | :--: |
| [block-spacing](http://eslint.org/docs/rules/block-spacing) | `[2, 'always']` |  _error_ |
| [brace-style](http://eslint.org/docs/rules/brace-style) | `[2, 'stroustrup', {'allowSingleLine': true}]` |  _error_ |
| [camelcase](http://eslint.org/docs/rules/camelcase) | `[2, {'properties': 'always'}]` |  _error_ |
| [consistent-this](http://eslint.org/docs/rules/consistent-this) | `[2, '_this']` |  _error_ |
| [func-style](http://eslint.org/docs/rules/func-style) | `[2, 'expression']` |  _error_ |
| [indent](http://eslint.org/docs/rules/indent) | `[2, 2, {'VariableDeclarator': {'var': 2}, 'SwitchCase': 2}]` |  _error_ |
| [linebreak-style](http://eslint.org/docs/rules/linebreak-style) | `[2, 'unix']` |  _error_ |
| [lines-around-comment](http://eslint.org/docs/rules/lines-around-comment) | `[2, {'beforeBlockComment': true, 'beforeLineComment': true, 'allowBlockStart': true, 'allowObjectStart': true, 'allowArrayStart': true}]` |  _error_ |
| [max-depth](http://eslint.org/docs/rules/max-depth) | `[1, 4]` |  _warning_ |
| [one-var](http://eslint.org/docs/rules/one-var) | `[2, {'var': 'always', 'let': 'never', 'const': 'never'}]` |  _error_ |
| [padded-blocks](http://eslint.org/docs/rules/padded-blocks) | `[2, 'never']` |  _error_ |
| [quote-props](http://eslint.org/docs/rules/quote-props) | `[2, 'consistent']` |  _error_ |
| [space-before-keywords](http://eslint.org/docs/rules/space-before-keywords) | `[2, 'always']` |  _error_ |
| [space-unary-ops](http://eslint.org/docs/rules/space-unary-ops) | `[2, {'words': true, 'nonwords': false}]` |  _error_ |
| [spaced-comment](http://eslint.org/docs/rules/spaced-comment) | `[2, 'always', {'exceptions': ['-', '+', '/', '*'], 'markers': ['=', '!']}]` |  _error_ |
