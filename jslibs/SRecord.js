if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof File == 'undefined')
    console.require('File.js');

SRecord = (function() {
    var checksum_func = function(bytes) {
        var cksum = 0;
        for (var i = 0; i < bytes.length; i++) {
            cksum += parseInt('0x' + bytes[i]);
        }
        cksum &= 0xFF;
        cksum = 0xFF - cksum;
        return cksum;
    };
    var types = [];
    //S0 Header
    types[0] = function(obj, bytes) {
        var count = 0;
        var i = 0;
        var checksum = parseInt('0x' + bytes.pop());
        var address = '0x';
        obj.checksum = checksum_func(bytes);
        count += parseInt('0x' + bytes.shift());
        address += bytes.shift();
        address += bytes.shift();
        count -= 3;
        obj.address = parseInt(address);
        obj.data = '';
        for (i = 0; i < bytes.length; i++) {
            obj.data += String.fromCharCode(parseInt('0x' + bytes[i]));
        }
        if (count != i)
            throw new Error('Number of lines (' + i + ') differ from count value!' + count);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S1 Data 16 bits
    types[1] = function(obj, bytes, nline) {
        var count = 0;
        var i = 0;
        var checksum = parseInt('0x' + bytes.pop());
        var address = '0x';
        obj.checksum = checksum_func(bytes);
        count += parseInt('0x' + bytes.shift());
        address += bytes.shift();
        address += bytes.shift();
        count -= 3;
        obj.address = parseInt(address);
        obj.data = '';
        for (i = 0; i < bytes.length; i++) {
            obj.data += String.fromCharCode(parseInt('0x' + bytes[i]));
        }
        if (count != i)
            console.log('i differs from count on line ' + nline);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S2 Data 24 bits
    types[2] = function(obj, bytes, nline) {
        var count = 0;
        var i = 0;
        var checksum = parseInt('0x' + bytes.pop());
        var address = '0x';
        obj.checksum = checksum_func(bytes);
        count += parseInt('0x' + bytes.shift());
        address += bytes.shift();
        address += bytes.shift();
        address += bytes.shift();
        count -= 4;
        obj.address = parseInt(address);
        for (i = 0; i < bytes.length; i++) {
            obj.data += String.fromCharCode(parseInt('0x' + bytes[i]));
        }
        if (count != i)
            console.log('i differs from count on line ' + nline);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S3 Data 32 bits
    types[3] = function(obj, bytes, nline) {
        var count = 0;
        var i = 0;
        var checksum = parseInt('0x' + bytes.pop());
        var address = '0x';
        obj.checksum = checksum_func(bytes);
        count += parseInt('0x' + bytes.shift());
        address += bytes.shift();
        address += bytes.shift();
        address += bytes.shift();
        address += bytes.shift();
        count -= 5;
        obj.address = parseInt(address);
        for (i = 0; i < bytes.length; i++) {
            obj.data += String.fromCharCode(parseInt('0x' + bytes[i]));
        }
        if (count != i)
            console.log('i differs from count on line ' + nline);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S4 Reserved
    types[4] = function(obj) {
        return obj;
    };
    //S5 Count 16 bits
    types[5] = function(obj, bytes, nline) {
        var checksum = parseInt('0x' + bytes.pop());
        var count = '0x';
        obj.checksum = checksum_func(bytes);
        count += bytes.shift();
        count += bytes.shift();
        obj.count = parseInt(count);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S6 Count 24 bits
    types[6] = function(obj, bytes, nline) {
        var checksum = parseInt('0x' + bytes.pop());
        var count = '0x';
        obj.checksum = checksum_func(bytes);
        count += bytes.shift();
        count += bytes.shift();
        count += bytes.shift();
        obj.count = parseInt(count);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S7 Entry Point 32 bits
    types[7] = function(obj, bytes, nline) {
        var checksum = parseInt('0x' + bytes.pop());
        var entry = '0x';
        var count = 0;
        obj.checksum = checksum_func(bytes);
        count = parseInt(bytes.shift());
        if (count != 5)
            console.log('count is not 5 at line ' + nline);
        entry += bytes.shift();
        entry += bytes.shift();
        entry += bytes.shift();
        entry += bytes.shift();
        obj.entry = parseInt(entry);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S8 Entry Point 24 bits
    types[8] = function(obj, bytes, nline) {
        var checksum = parseInt('0x' + bytes.pop());
        var entry = '0x';
        var count = 0;
        obj.checksum = checksum_func(bytes);
        count = parseInt(bytes.shift());
        if (count != 5)
            console.log('count is not 4 at line ' + nline);
        entry += bytes.shift();
        entry += bytes.shift();
        entry += bytes.shift();
        obj.entry = parseInt(entry);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    //S9 Entry Point 16 bits
    types[9] = function(obj, bytes, nline) {
        var checksum = parseInt('0x' + bytes.pop());
        var entry = '0x';
        var count = 0;
        obj.checksum = checksum_func(bytes);
        count = parseInt(bytes.shift());
        if (count != 5)
            console.log('count is not 3 at line ' + nline);
        entry += bytes.shift();
        entry += bytes.shift();
        obj.entry = parseInt(entry);
        obj.valid = obj.checksum == checksum;
        return obj;
    };
    var parseline = function(line, n) {
        var obj = {
            address: 0,
            checksum: 0,
            count: 0,
            data: '',
            entry: 0,
            type: -1,
            valid: false
        };
        if (!line || line.charAt(0) != 'S')
            throw new Error('Invalid line: \'' + line + '\' at ' + n);
        var bytes = line.match(/[0-9A-Za-z][0-9A-Za-z]/g)
        var type = bytes.shift();
        obj.type = parseInt(type.charAt(1));
        type = obj.type;
        if (!types[type])
            throw new Error('Invalid type: ' + type + ' on line \'' + line + '\' at ' + n);
        obj = types[type](obj, bytes, n);
        return obj;
    };
    var mmap = function(memory, address, data) {
        if (memory[address.toString(16)])
            throw new Error('Address: 0x' + address.toString(16) + ' already mapped.');
        memory[address.toString(16)] = data;
    };
    var mdump = function(address, data) {
        var mdata = '';
        for (var i = 0; i < data.length; i++) {
            var v = data.charCodeAt(i).toString(16);
            if (v.length != 2)
                v = '0' + v;
            mdata += v;
            if (i != 0 && i % 16 == 15)
                mdata += ' ';
        }
        mdata += '   ';
        for (var i = 0; i < data.length; i++) {
            var v = data.charCodeAt(i);
            if (v < 32 || v > 126)
                v = '.';
            else
                v = data.charAt(i);
            mdata += v;
        }
        console.log(address.toString(16) + ': ' + mdata);
    };

    return function(filename) {
        this.entry = 0xFF00000000;
        this.memory = {};
        this.alignment = 0;
        this.type0 = null;
        this.count = null;
        var fp = new File(filename, File.READ);
        var nline = 0;
        while (!fp.isEOF()) {
            var obj = parseline(fp.readline(), nline);
            if (!obj.valid)
                throw new Error('Failed to parse: invalid line ' + nline);
            if (obj.type == 1 || obj.type == 2 || obj.type == 3) {
                mmap(this.memory, obj.address, obj.data);
                this.alignment = (this.alignment < obj.address.toString(16).length) ? obj.address.toString(16).length : this.alignment;
            } else if (obj.type == 7 || obj.type == 8 || obj.type == 9) {
                this.entry = obj.entry;
            } else if (obj.type == 0)
                this.type0 = obj.data;
            else if (obj.type == 5 || obj.type == 6)
                this.count = obj.count;
            nline++;
        }
        if (this.entry == 0xFF00000000)
            throw new Error('Missing entry point');
        fp.close();
        this.dump = function() {
            if (this.count)
                console.log('Count: ' + this.count);
            if (this.type0)
                console.log('Data: ' + this.type0);
            console.log('Align: ' + (this.alignment + 1));
            console.log('Entry: 0x' + this.entry.toString(16));
            for (var address in this.memory) {
                mdump(address, this.memory[address]);
            }
        };
    };
})();