if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof Buffer == 'undefined')
    console.require('Buffer.js');
TypesLE = (function() {
    var t = function() {
        this.uintX_t = function(buffer, size) {
            if (typeof buffer == 'object')
                buffer = buffer.next(size);
            var data = 0;
            for (var i = buffer.length - 1; i >= 0; i--) {
                data <<= 8;
                data |= buffer.charCodeAt(i);
            }
            return data >>> 0;
        };
        this.intX_t = function(buffer, size) {
            if (typeof buffer == 'object')
                buffer = buffer.next(size);
            var data = 0;
            for (var i = buffer.length - 1; i >= 0; i--) {
                data |= buffer.charCodeAt(i);
                data <<= 8;
            }
            return data >>> 0;
        };
        this.uint64_t = function(buffer) {
            var x = new Array(2);
            x[1] = TypesLE.uint32_t(buffer);
            x[0] = TypesLE.uint32_t(buffer);
            return x;
        };
        this.uint32_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(4);
            var data = buffer.charCodeAt(0);
            data |= buffer.charCodeAt(1) << 8;
            data |= buffer.charCodeAt(2) << 16;
            data |= buffer.charCodeAt(3) << 24;
            return data >>> 0;
        };
        this.uint24_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(4);
            var data = buffer.charCodeAt(0);
            data |= buffer.charCodeAt(1) << 8;
            data |= buffer.charCodeAt(2) << 16;
            return data >>> 0;
        };
        this.uint16_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(2);
            var data = buffer.charCodeAt(0);
            data |= buffer.charCodeAt(1) << 8;
            return (data >>> 0) & 0x0FFFF;
        };
        this.uint8_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(0);
            return buffer.charCodeAt(1) >>> 0;
        };
        this.int64_t = function(buffer) {
            var x = new Array(2);
            x[1] = TypesLE.uint32_t(buffer);
            x[0] = TypesLE.int32_t(buffer);
            return x;
        };
        this.int32_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(4);
            var data = buffer.charCodeAt(0) >>> 0;
            data |= (buffer.charCodeAt(1) << 8) >>> 0;
            data |= (buffer.charCodeAt(2) << 16) >>> 0;
            data |= buffer.charCodeAt(3) << 24;
            return data;
        };
        this.int24_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(4);
            var data = buffer.charCodeAt(0) >>> 0;
            data |= (buffer.charCodeAt(1) << 8) >>> 0;
            data |= (buffer.charCodeAt(2) << 16);
            return data;
        };
        this.int16_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(2);
            var data = buffer.charCodeAt(0) >>> 0;
            data |= buffer.charCodeAt(1) << 8;
            return data;
        };
        this.int8_t = function(buffer) {
            if (typeof buffer == 'object')
                buffer = buffer.next(1);
            return buffer.charCodeAt(0);
        };
        this.toArray = function(buffer, size, type) {
            if (typeof type != 'function')
                throw new Error('toArray: Bad argument');
            size = size >>> 0;
            var data = [];
            for (var i = 0; i < size; i++) {
                data[i] = type(buffer);
            }
            return data;
        };
        this.bits = function(value, frombit, tobit) {
            if (typeof value != 'number' || frombit > 32 || tobit > 32)
                throw new Error('bits: Bad argument');
            return (value >>> frombit) & (0xFFFFFFFF >>> (32 - tobit));
        };
        this.pack8 = function(value) {
            if (typeof value != 'number')
                throw new Error('pack8: Bad argument');
            return String.charCodeAt((value & 0x00FF) >>> 0);
        };
        this.pack16 = function(value) {
            if (typeof value != 'number')
                throw new Error('pack8: Bad argument');
            return String.charCodeAt((value & 0x00FF) >>> 0) + String.charCodeAt((value & 0x00FF00) >>> 8);
        };
        this.pack32 = function(value) {
            if (typeof value != 'number')
                throw new Error('pack8: Bad argument');
            return String.charCodeAt((value & 0x00FF) >>> 0) + String.charCodeAt((value & 0x00FF00) >>> 8) + String.charCodeAt((value & 0x00FF0000) >>> 16) + String.charCodeAt((value & 0x00FF000000) >>> 24);
        };
        this.pack64 = function(value) {
            if (typeof value != 'object')
                throw new Error('pack8: Bad argument');
            return this.pack32(value[0]) + this.pack32(value[1]);
        };
    };
    return new t();
})();