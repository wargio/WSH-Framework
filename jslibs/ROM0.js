if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof Binary == 'undefined')
    console.require('Binary.js');
if (typeof SRecord == 'undefined')
    console.require('SRecord.js');
if (typeof ECMA5 == 'undefined')
    console.require('ECMA5.js');
if (typeof Buffer == 'undefined')
    console.require('Buffer.js');
if (typeof Types == 'undefined')
    console.require('Types.js');


ROM0 = (function() {
    var romcreate = function(filename, memory, entry, alignment) {
        var rom = {};
        rom.header = '';
        rom.data = '';
        rom.counter = 0;
        rom.entry = entry;
        rom.tocoff = 0;
        rom.tocsize = 0;
        rom.dataoff = 0;
        rom.datasize = 0;
        rom.alignment = alignment;
        rom.section = [];
        var offset = 0,
            last = 0;

        var parseBin = function(value) {
            value = value.toString(16);
            if (value.length < 8)
                value = '00000000'.substr(0, 8 - value.length) + value;
            var bytes = value.match(/[0-9A-Fa-f][0-9A-Fa-f]/g);
            var data = '';
            data += String.fromCharCode(parseInt('0x' + bytes[0]));
            data += String.fromCharCode(parseInt('0x' + bytes[1]));
            data += String.fromCharCode(parseInt('0x' + bytes[2]));
            data += String.fromCharCode(parseInt('0x' + bytes[3]));
            return data;
        };

        if (filename.indexOf('.rom') != filename.length - 4)
            filename += '.rom';

        console.log('Generating rom sections');
        rom.section[rom.counter] = {
            length: 0,
            offset: rom.data.length
        };
        var pos = 0;
        for (var elem in memory) {
            if (!memory.hasOwnProperty(elem))
                continue;
            offset = parseInt('0x' + elem);
            if (last < offset) {
                pos = rom.section[rom.counter].length;
                last = offset;
                if (rom.section[rom.counter].length != 0)
                    rom.counter++;
                rom.section[rom.counter] = {
                    length: 0,
                    offset: pos,
                    address: offset
                };
            }
            rom.section[rom.counter].length += memory[elem].length;
            rom.data += memory[elem];
            last += memory[elem].length;
        }
        rom.counter++;
        console.log('Generating rom header');
        rom.tocoff = 0x20;
        rom.tocsize = rom.counter * 0x10;
        rom.datasize = rom.data.length;
        rom.dataoff = 0x20 + rom.tocsize;

        rom.alignment = Math.floor(rom.alignment / 2) + (rom.alignment % 2);

        rom.header = 'ROM0';
        rom.header += parseBin(rom.counter);
        rom.header += parseBin(rom.entry);
        rom.header += parseBin(rom.alignment);
        rom.header += parseBin(rom.tocoff);
        rom.header += parseBin(rom.tocsize);
        rom.header += parseBin(rom.dataoff);
        rom.header += parseBin(rom.datasize);

        for (var i = 0; i < rom.section.length; i++) {
            rom.header += parseBin(rom.section[i].offset + 0x20 + rom.tocsize);
            rom.header += parseBin(rom.section[i].length);
            rom.header += parseBin(rom.section[i].address);
            rom.header += parseBin(0xFFFFADD0);
        }

        console.log('Generating rom');
        console.log('Magic      : ROM0');
        console.log('Sectors cnt: ' + rom.counter);
        console.log('Entry point: ' + rom.entry.toString(16));
        console.log('Alignment  : ' + rom.alignment);
        console.log('TOC offset : ' + rom.tocoff.toString(16));
        console.log('TOC size   : ' + rom.tocsize.toString(16));
        console.log('Data offset: ' + rom.dataoff.toString(16));
        console.log('Data size  : ' + rom.datasize.toString(16));
        var bin = rom.header + rom.data;
        rom.data = null;
        rom.header = null;

        console.log('\nSaving to: ' + filename);
        var fp = new Binary(filename, Binary.WRITE);
        fp.write(bin);
        fp.close();
    }

    var RomStruct = function(binary, size) {
        this.magic = binary.next(4);
        this.n_sectors = Types.uint32_t(binary);
        this.entry = Types.uint32_t(binary);
        this.alignment = Types.uint32_t(binary);
        this.tocoff = Types.uint32_t(binary);
        this.tocsize = Types.uint32_t(binary);
        this.dataoff = Types.uint32_t(binary);
        this.datasize = Types.uint32_t(binary);
        this.print = function() {
            console.log('ROM0 Data');
            console.log('  Magic      : ' + this.magic);
            console.log('  Sectors cnt: ' + this.n_sectors);
            console.log('  Entry point: ' + this.entry.toString(16));
            console.log('  Alignment  : ' + this.alignment);
            console.log('  TOC offset : ' + this.tocoff.toString(16));
            console.log('  TOC size   : ' + this.tocsize.toString(16));
            console.log('  Data offset: ' + this.dataoff.toString(16));
            console.log('  Data size  : ' + this.datasize.toString(16));
        }
    };
    var romdump = function(filename) {
        var bfp = new Binary(filename, Binary.READ);
        var binary = new Buffer(bfp); //.read());
        var rom = new RomStruct(binary);
        //bfp.close();
        rom.binary = binary;
        return rom;
    };
    return {
        create: function(filename, srecord) {
            romcreate(filename, srecord.memory, srecord.entry, srecord.alignment);
        },
        dump: function(filename) {
            return romdump(filename);
        }
    };
})();