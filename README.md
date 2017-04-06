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
cscript //Nologo crypto.js %1 %2 %3 %4 %5 %6 %8 %9
@echo on
```

to write a simple script file like that one, you just need to copy `Template.js` and use `console.require()` (like in the example) to load a component into your script.

## Framework Utility

```
    Composer.js                 | this tool will create a unique file from all the dependencies added into your script
                                | in this way you won't need to use any environment value to call require.
                                | usage: usage: cscript Composer.js [filename.js] [composed.filename.js]
```

## Framework API

```
    jslibs/default.js           | will give you the minimal required functions to load any api (console[something]).
    jslibs/AES.js               | this is the AES implementation for Javascript.
    jslibs/ASN1.js              | this is the ASN1 decompiler.
    jslibs/Base64.js            | this is the Base64 encoder/decoder implementation for Javascript.
    jslibs/Binary.js            | this object will allow you to read and write binary files.
    jslibs/Buffer.js            | this is a helper structure to be used with Binary.
    jslibs/ECMA5.js             | ECMA 5 missing implementation on MS JScript (not complete)
    jslibs/File.js              | is just simple object that allows to read and write text files.
    jslibs/FileSystem.js        | this is a set of useful functions to work with the filesystem.
    jslibs/Helpers.js           | some helpers to dump values like toHex for string, etc.
    jslibs/HTTPRequest.js       | allows to do XHR requests (also via proxy or broken SSL).
    jslibs/Int10.js             | on WSH the Int10 object is missing. this will allow you to use it.
    jslibs/JSON.js              | on WSH the JSON object is missing. this will allow you to use it.
    jslibs/Options.js           | this object parse the command line input to the given option filter end execute it.
    jslibs/ROM0.js              | this will allow you to convert the Motorola SRecord to readable binary file via hexdump.
    jslibs/SHA1.js              | just the SHA1 algo. it will take a string as an input value and return the digest as a string too.
    jslibs/SHA224.js            | just the SHA224 algo. it will take a string as an input value and return the digest as a string too.
    jslibs/SHA256.js            | just the SHA256 algo. it will take a string as an input value and return the digest as a string too.
    jslibs/SRecord.js           | this is just a Motorola SRecord parser for javascript.
    jslibs/Types.js             | converts a buffer to a [u]int[8,16,32,64]_t value ([u]int64_t values are arrays due platform limitation).
    jslibs/TypesLE.js           | converts a buffer to a [u]int[8,16,32,64]_t value ([u]int64_t values are arrays due platform limitation).
    jslibs/UI.js                | an object to create a simple visible UI via script.
    jslibs/WMI.js               | this will allow you to talk with the Windows Management Instrumentation.

```

## TODO

I'm open to suggestions. If you know what should be improved, then tell me.

### Missing docs

```
    jslibs/default.js           | Missing refs/documentation
    jslibs/AES.js               | Missing refs/documentation
    jslibs/ASN1.js              | Missing refs/documentation
    jslibs/Base64.js            | Missing refs/documentation
    jslibs/Binary.js            | Missing refs/documentation
    jslibs/Buffer.js            | Missing refs/documentation
    jslibs/ECMA5.js             | Missing refs/documentation
    jslibs/File.js              | Missing refs/documentation
    jslibs/FileSystem.js        | Missing refs/documentation
    jslibs/Helpers.js           | Missing refs/documentation
    jslibs/HTTPRequest.js       | Missing refs/documentation
    jslibs/Int10.js             | Missing refs/documentation
    jslibs/JSON.js              | Missing refs/documentation
    jslibs/Options.js           | Missing refs/documentation
    jslibs/ROM0.js              | Missing refs/documentation
    jslibs/SHA1.js              | Missing refs/documentation
    jslibs/SHA224.js            | Missing refs/documentation
    jslibs/SHA256.js            | Missing refs/documentation
    jslibs/SRecord.js           | Missing refs/documentation
    jslibs/Types.js             | Missing refs/documentation
    jslibs/TypesLE.js           | Missing refs/documentation
    jslibs/UI.js                | Missing refs/documentation
    jslibs/WMI.js               | Missing refs/documentation
```

### Missing libs.

``` 
   jslib/PRNG.js                | this will be the future object to generate "secure" random number.
                                | #Comments: Entropy on JScript is really bad.. i really don't know where to find it
                                | #Comments: Maybe i should open a browser view at fullscreen to catch some entropy from the pointer.
                                | #Comments: This is implemented, but the entropy is really bad. Need really good fixes for this.
```