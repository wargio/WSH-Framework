File = (function() {
    var x = function(fname, flags) {
        var f = new ActiveXObject("Scripting.FileSystemObject");
        this.READ = 1;
        this.WRITE = 2;
        this.APPEND = 8;
        this.filename = fname;
        this.flags = (flags == this.WRITE ? this.WRITE : (flags == this.READ ? this.READ : this.APPEND));
        if (this.flags == this.READ)
            this.ctx = f.OpenTextFile(this.filename, this.flags);
        else
            this.ctx = f.CreateTextFile(this.filename, this.flags);
        if (!this.ctx)
            throw new Error('Cannot open ' + fname);
        this.position = 0;
    };
    x.READ = 1;
    x.WRITE = 2;
    x.APPEND = 8;
    x.prototype.close = function() {
        if (!this.ctx)
            return;
        this.ctx.Close();
        this.ctx = null;
    };
    x.prototype.readline = function() {
        if (!this.ctx || this.flags != this.READ || this.ctx.AtEndOfStream)
            return;
        var ret = this.ctx.ReadLine();
        this.position += ret ? ret.length : 0;
        return ret;
    };
    x.prototype.read = function(bytes) {
        if (!this.ctx || this.flags != this.READ || this.ctx.AtEndOfStream)
            return;
        var ret = '';
        if (!bytes)
            ret = this.ctx.readAll();
        else
            ret = this.ctx.read(bytes);
        this.position += ret ? ret.length : 0;
        return ret;
    };
    x.prototype.write = function(towrite) {
        if (!this.ctx || (this.flags != this.WRITE && this.flags != this.APPEND))
            return;
        this.ctx.Write(towrite);
    };
    x.prototype.isEOF = function() {
        return this.ctx.AtEndOfStream;
    };
    x.prototype.seek = function(position) {
        if (position >= 0)
            this.ctx.Position = position;
    };
    x.prototype.tell = function() {
        return this.position >>> 0;
    };
    x.prototype.size = function() {
        return 0;
    };
    return x;
})();