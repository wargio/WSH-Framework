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
    jslibs/default.js           | will give you the minimal required functions to load any api (console[something])
    jslibs/AES.js               | this is the AES implementation for Javascript
    jslibs/ASN1.js              | this is the ASN1 compiler/decompiler
    jslibs/Binary.js            | this object will allow you to read and write binary files 
    jslibs/File.js              | is just simple object that allows to read and write text files.
    jslibs/FileSystem.js        | this is a set of useful functions to work with the filesystem
    jslibs/Int10.js             | on WSH the Int10 object is missing. this will allow you to use it.
    jslibs/JSON.js              | on WSH the JSON object is missing. this will allow you to use it.
    jslibs/Options.js           | this object parse the command line input to the given option filter end execute it.
    jslibs/ROM0.js              | this will allow you to convert the Motorola SRecord to readable binary file via hexdump
    jslibs/SHA1.js              | just the SHA1 algo. it will take a string as an input value and return the digest as a string too.
    jslibs/SRecord.js           | this is just a Motorola SRecord parser for javascript
    jslibs/Utils.js             | just a set of utils like the string to u32 converter
    jslibs/WMI.js               | this will allow you to talk with the Windows Management Instrumentation
```

## TODO

I'm open to suggestions. If you know what should be improved, then tell me.

### Missing docs

```
    jslibs/AES.js               | Missing refs/documentation
    jslibs/ASN1.js              | Missing refs/documentation
    jslibs/Binary.js            | Missing refs/documentation
    jslibs/default.js           | Missing refs/documentation
    jslibs/File.js              | Missing refs/documentation
    jslibs/FileSystem.js        | Missing refs/documentation
    jslibs/Int10.js             | Missing refs/documentation
    jslibs/JSON.js              | Missing refs/documentation
    jslibs/Options.js           | Missing refs/documentation
    jslibs/ROM0.js              | Missing refs/documentation
    jslibs/SHA1.js              | Missing refs/documentation
    jslibs/SRecord.js           | Missing refs/documentation
    jslibs/Utils.js             | Missing refs/documentation
    jslibs/WMI.js               | Missing refs/documentation
```

### Missing libs.

``` 
   jslib/PRNG.js                | this will be the future object to generate "secure" random number.
                                | #Comments: Entropy on JScript is really bad.. i really don't know where to find it
                                | #Comments: Maybe i should open a browser view at fullscreen to catch some entropy from the pointer.
   jslib/UI.js                  | this will be the future object to create a simple visible UI via script. 
                                | #Comments: Dummy POC is ready.. and it's bad..
   jslib/NetSocket.js           | this will be the future object to create a TCP/UDP socket via script. 
                                | #Comments: Winsocks? Maybe a custom posix-like OCX is better? i don't know.
```