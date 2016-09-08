Utils = {};
Utils.toHex = function(value) {
    var data = '';
    for (var i = 0; i < value.length; i++) {
        var byte = (value.charCodeAt(i) & 0xFF).toString(16);
        if (byte.length < 2)
            byte = '0' + byte;
        data += byte;
    }
    return data.toUpperCase();
}
Utils.toU32 = function(value) {
    var data = 0;
    data |= value.charCodeAt(3);
    data |= value.charCodeAt(2) << 8;
    data |= value.charCodeAt(1) << 16;
    data |= value.charCodeAt(0) << 24;
    return data & 0x0FFFFFFFF;
};
Utils.toU16 = function(value) {
    var data = 0;
    data |= value.charCodeAt(1);
    data |= value.charCodeAt(0) << 8;
    return data & 0x0FFFF;
};
Utils.toU8 = function(value) {
    return value.charCodeAt(0) & 0x0FF;
};
Utils.memcpy = function(value, offset, size) {
    return value.substr(offset, size);
};
Utils.intToHex = function(value, base) {
    var hex = '0123456789abcdef';
    var r = '';
    var x = 0xF & value;
    r += hex.charAt(x);
    while (value) {
        value >>>= 4;
        x = 0xF & value;
        r = hex.charAt(x) + r;
    }
    if (r.length == 1)
        r = '0' + r;
    else if (r.length > 2 && r.charAt(0) == '0')
        r = r.substr(1, r.length);
    return r;
};