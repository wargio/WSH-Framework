(function() { var a = ActiveXObject; var w = new a("WScript.Shell"); var f = new a("Scripting.FileSystemObject"); var e = w.ExpandEnvironmentStrings('%JSLIB%'); if (!e || e == '%JSLIB%') throw new Error("Missing environment variable '%JSLIB%'."); var s = f.openTextFile(e + '\\default.js', 1); var d = s.readAll(); s.Close(); eval(d); f = s = d = null; })();

if (typeof FileSystem == 'undefined')
    console.require('FileSystem.js');

if (typeof File == 'undefined')
    console.require('File.js');

if (typeof Binary == 'undefined')
    console.require('Binary.js');

if (typeof aesjs == 'undefined')
    console.require('AES.js');

if (typeof Options == 'undefined')
    console.require('Options.js');

String.prototype.toArray = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(this.charCodeAt(i));
    }
    return result;
}

String.fromArrayCode = function(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += this.fromCharCode(array[i]);
    }
    return result;
}

var parseBin32 = function(value) {
    value = value.toString(16); //utils.intToHex(value, 16);
    if (value.length < 8)
        value = '00000000'.substr(0, 8 - value.length) + value;
    var bytes = value.match(/[0-9A-Fa-f][0-9A-Fa-f]/g);
    var data = '';
    data += String.fromCharCode(parseInt(bytes[0], 16));
    data += String.fromCharCode(parseInt(bytes[1], 16));
    data += String.fromCharCode(parseInt(bytes[2], 16));
    data += String.fromCharCode(parseInt(bytes[3], 16));
    return data;
};
var parseU32 = function(value) {
    var data = 0;
    data |= value.charCodeAt(3);
    data |= value.charCodeAt(2) << 8;
    data |= value.charCodeAt(1) << 16;
    data |= value.charCodeAt(0) << 24;
    return 0x0FFFFFFFF & data;
}


var opts = {
    '-e': {
        args: 3,
        exec: function() {
            var key = console.args[1];
            var iv = console.args[2];
            var Filename = console.args[3];
            if (key.length != 16 && key.length != 24 && key.length != 32)
                throw new Error("Key is not made of 16/24/32 bytes (" + key.length + " bytes)");
            if (iv.length != 16)
                throw new Error("IV is not made of 16 bytes (" + iv.length + " bytes)");
            if (!FileSystem.exists(Filename))
                throw new Error("'" + Filename + "' doesn't exist.");
            key = key.toArray(); //aesjs.util.convertStringToBytes(key);
            iv = iv.toArray(); //aesjs.util.convertStringToBytes(iv);
            var stat = FileSystem.stat(Filename);
            var source = new Binary(Filename, Binary.READ);
            var destination = new Binary(Filename + ".encrypted", Binary.WRITE);
            var cbc = new aesjs.ModeOfOperation.cbc(key, iv);
            var written = 0;
            while (!source.isEOF()) {
                var read = source.read(16384);
                if (!read || read.length == 0) break;
                while (read.length % 16 != 0)
                    read += String.fromCharCode(0);
                written += read.length;
                console.log("Reading " + written + "/" + stat.size + " bytes");
                var binsrc = read.toArray(); //aesjs.util.convertStringToBytes(read);
                var bindest = cbc.encrypt(binsrc); //aesjs.util.convertBytesToString(cbc.encrypt(binsrc));
                destination.write(String.fromArrayCode(bindest));
            }
            destination.close();
            source.close();
            console.log("written '" + Filename + ".encrypted' " + written + " bytes.");
        },
        usage: "     -e <key> <iv> <Filename>         | encrypts a File with a given key and iv."
    },
    '-d': {
        args: 3,
        exec: function() {
            var key = console.args[1];
            var iv = console.args[2];
            var Filename = console.args[3];
            if (key.length != 16 && key.length != 24 && key.length != 32)
                throw new Error("Key is not made of 16/24/32 bytes (" + key.length + " bytes)");
            if (iv.length != 16)
                throw new Error("IV is not made of 16 bytes (" + iv.length + " bytes)");
            if (Filename.indexOf(".encrypted") < 0)
                throw new Error("'" + Filename + "' is not a '.encrypted' File.");
            if (!FileSystem.exists(Filename))
                throw new Error("'" + Filename + "' doesn't exist.");
            key = key.toArray();
            iv = iv.toArray();
            var stat = FileSystem.stat(Filename);
            var source = new Binary(Filename, Binary.READ);
            var destination = new Binary(Filename + ".decrypted", Binary.WRITE);
            var cbc = new aesjs.ModeOfOperation.cbc(key, iv);
            var written = 0;
            while (!source.isEOF()) {
                var read = source.read(16384);
                if (!read || read.length == 0) break;
                written += read.length;
                console.log("Reading " + written + "/" + stat.size + " bytes");
                var binsrc = read.toArray();
                var bindest = cbc.decrypt(binsrc);
                destination.write(String.fromArrayCode(bindest));
            }
            destination.close();
            source.close();
            console.log("written '" + Filename + ".decrypted' " + written + " bytes.");
        },
        usage: "     -d <key> <iv> <Filename>         | decrypts a File with a given key and iv."
    }
}

var options = new Options(opts);
options.main();