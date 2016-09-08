Int10 = (function() {
    var max = 10000000000000; // biggest integer that can still fit 2^53 when multiplied by 256

    function Int10(value) {
        this.buf = [+value || 0];
    }

    Int10.prototype.mulAdd = function(m, c) {
        // assert(m <= 256)
        var b = this.buf,
            l = b.length,
            i, t;
        for (i = 0; i < l; ++i) {
            t = b[i] * m + c;
            if (t < max)
                c = 0;
            else {
                c = 0 | (t / max);
                t -= c * max;
            }
            b[i] = t;
        }
        if (c > 0)
            b[i] = c;
    };
    Int10.prototype.toString = function(base) {
        if ((base || 10) != 10)
            throw 'only base 10 is supported';
        var b = this.buf,
            s = b[b.length - 1].toString();
        for (var i = b.length - 2; i >= 0; --i)
            s += (max + b[i]).toString().substring(1);
        return s;
    };
    Int10.prototype.valueOf = function() {
        var b = this.buf,
            v = 0;
        for (var i = b.length - 1; i >= 0; --i)
            v = v * max + b[i];
        return v;
    };
    Int10.prototype.simplify = function() {
        var b = this.buf;
        return (b.length == 1) ? b[0] : this;
    };
    return Int10;
})();