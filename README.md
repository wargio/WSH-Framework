# WSH-Framework
This framework has been written to work with the Windows Host Script platform to provide the basic methods to develop simple scripting tools.

`This framework is fully written in JAVASCRIPT`

## How to use
To use this framework you need to set the environment value `JSLIB`
there are two ways: add it to the environment table or add it to a `.bat` file .

An example is `crypto.bat` which will execute the example called `cipher.js`
```
@echo off
set JSLIB=C:\jslibs\
cscript //Nologo C:\DevTools\cipher.js %1 %2 %3 %4 %5 %6 %8 %9
@echo on
```

to write a simple script file like that one, you just need to copy `Template.js` and use `console.require()` (like in the example) to load a component into your script.

in the future i'd like to support multiple things and also provide a method to "compile" (i.e. to merge) a script to a unique one that will not require this setup with the environment table.

## Framework API

```
    jslibs/default.js           | will give you the minimal required functions to load any api (console[something])
    jslibs/File.js              | is just simple object that allows to read and write text files.
    jslibs/JSON.js              | on WSH the JSON object is missing. this will allow you to use it.
    jslibs/SHA1.js              | just the SHA1 algo. it will take a string as an input value and return the digest as a string too.
    jslibs/Utils.js             | just a set of utils like the string to u32 converter
    jslibs/Binary.js            | this object will allow you to read and write binary files 
    jslibs/ASN1.js              | this is the ASN1 compiler/decompiler
    jslibs/Int10.js             | on WSH the Int10 object is missing. this will allow you to use it.
    jslibs/FileSystem.js        | this is a set of useful functions to work with the filesystem
    jslibs/AES.js               | this is the AES implementation for Javascript
    jslibs/SRecord.js           | this is just a Motorola SRecord parser for javascript
    jslibs/ROM0.js              | this will allow you to convert the Motorola SRecord to readable binary file via hexdump
```

## TODO

``` 
   jslib/PRNG.js                | this will be the future object to generate "secure" random number.
   jslib/UI.js                  | this will be the future object to create a simple visible UI via script.
```