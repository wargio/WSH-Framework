if (typeof console == 'undefined')
    throw new Error("Missing require default.js");
if (typeof Binary == 'undefined')
    console.require('Binary.js');

Buffer = (function() {
    var Buf = function(data) {
        if (this.not_new)
            throw new Error('Buffer: use "new".');
        if (!data)
            data = '';
        this.buffer = data;
        if (typeof data == 'string') {
            this.position = 0;
            this.next = function(count) {
                if (count < 0)
                    throw new Error('next: argument is < 0.');
                if (this.position < 0)
                    throw new Error('next: position is < 0.');
                if ((this.position + count) > this.buffer.length)
                    throw new Error('next: out of bound. position: 0x' + this.position.toString(16) + '; count: 0x' + count.toString(16) + '; length: 0x' + this.buffer.length.toString(16));
                var p = this.position;
                this.position += count;
                return this.buffer.substr(p, count);
            };
            this.rewind = function() {
                this.position = 0;
            };
            this.skip = function(count) {
                if (count >= 0)
                    this.position += count;
            };
            this.seek = function(position) {
                if (position >= 0)
                    this.position = position;
            };
            this.offset = function() {
                return this.position >>> 0;
            };
            this.size = function() {
                return this.buffer.length >>> 0;
            };
            this.append = function(data) {
                if (typeof data != 'string')
                    throw new Error('append: Invalid data; typeof != string');
                this.buffer += data;
            };
        } else if (typeof data == 'object' && typeof data.tell == 'function') {
            this.next = function(count) {
                if (count < 0)
                    throw new Error('next: argument is < 0.');
                if ((this.position + count) > this.buffer.size())
                    throw new Error('next: out of bound. position: 0x' + this.position.toString(16) + '; count: 0x' + count.toString(16) + '; length: 0x' + this.buffer.size().toString(16));
                return this.buffer.read(count);
            };
            this.rewind = function() {
                this.buffer.seek(0);
            };
            this.skip = function(count) {
                if (count >= 0)
                    this.buffer.seek(this.buffer.tell() + count);
            };
            this.seek = function(position) {
                if (position >= 0)
                    this.buffer.seek(position);
            };
            this.offset = function() {
                return this.buffer.tell();
            };
            this.size = function() {
                return this.buffer.size() >>> 0;
            };
            this.append = function(data) {
                if (typeof data != 'string')
                    throw new Error('append: Invalid data; typeof != string');
                this.buffer.write(data);
            };
        } else {
            throw new Error('Invalid argument: ' + data);
        }
    };
    Buf.not_new = true;
    return Buf;
})();