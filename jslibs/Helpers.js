String.prototype.toHex = function() {
    var d = '';
    for (var i = 0; i < this.length; i++) {
        var byte = (this.charCodeAt(i) >>> 0).toString(16);
        if (byte.length < 2)
            byte = '0' + byte;
        d += byte;
    }
    return '' + d.toUpperCase();
};

String.prototype.sanitize = function() {
    var s = "";
    for (var i = 0; i < this.length; i++) {
        var c = this.charCodeAt(i);
        if (c < 0x20 || c > 0x7E) continue;
        s += this.charAt(i);
    }
    return s;
};

String.alloc = function(size, byteCode) {
    if (typeof byteCode == 'undefined') byteCode = 0;
    var s = "";
    for (var i = 0; i < size; i++) {
        s += String.fromCharCode(byteCode);
    }
    return s;
};

String.fromHex = function(s) {
    if (typeof s != 'string') throw new Error("Expected 'string' type and not " + (typeof s));
    var hex = '0123456789ABCDEF';
    var d = s.toUpperCase();
    d = (d.length % 2) ? '0' + d : d;
    d = d.match(/[A-F0-9][A-F0-9]/g);
    var c = '';
    for (var i = 0; i < d.length; i++) {
        var code = hex.indexOf(d[i].charAt(0)) << 4;
        code |= hex.indexOf(d[i].charAt(1));
        c += String.fromCharCode(code);
    }
    return c;
};

Number.prototype.toHex = function() {
    var d = this.toString(16).toUpperCase();
    return (d.length % 2) ? '0' + d : d;
};

Number.prototype.toBin = function(size) {
    if (!size) size = 0;
    var hex = '0123456789ABCDEF';
    var d = this.toString(16).toUpperCase();
    d = (d.length % 2) ? '0' + d : d;
    d = d.match(/[A-F0-9][A-F0-9]/g);
    var c = '';
    for (var i = 0; i < d.length; i++) {
        var code = hex.indexOf(d[i].charAt(0)) << 4;
        code |= hex.indexOf(d[i].charAt(1));
        c += String.fromCharCode(code);
    }
    if (size > d.length)
        return String.alloc(size - d.length) + c;
    return c;
};