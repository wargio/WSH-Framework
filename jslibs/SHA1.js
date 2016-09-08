SHA1 = (function() {
    var u32 = function(r) {
        var h = '';
        var hex = '0123456789ABCDEF';
        for (var i = 0; i < 8; i++) {
            var p = 0x0F & r;
            h += hex.charAt(p)
            r >>>= 4;
        }
        return h;
    }
    var rotLeft = function(n, s) {
        var t4 = (n << s) | (n >>> (32 - s))
        return t4
    }
    return function(str) {
        var blockstart
        var i, j
        var W = new Array(80)
        var H0 = 0x67452301
        var H1 = 0xEFCDAB89
        var H2 = 0x98BADCFE
        var H3 = 0x10325476
        var H4 = 0xC3D2E1F0
        var A, B, C, D, E
        var temp
        str = unescape(encodeURIComponent(str))
        var strLen = str.length
        var wordArray = []
        for (i = 0; i < strLen - 3; i += 4) {
            j = str.charCodeAt(i) << 24 |
                str.charCodeAt(i + 1) << 16 |
                str.charCodeAt(i + 2) << 8 |
                str.charCodeAt(i + 3)
            wordArray.push(j)
        }
        switch (strLen % 4) {
            case 0:
                i = 0x080000000
                break
            case 1:
                i = str.charCodeAt(strLen - 1) << 24 | 0x0800000
                break
            case 2:
                i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000
                break
            case 3:
                i = str.charCodeAt(strLen - 3) << 24 |
                    str.charCodeAt(strLen - 2) << 16 |
                    str.charCodeAt(strLen - 1) <<
                    8 | 0x80
                break
        }
        wordArray.push(i)
        while ((wordArray.length % 16) !== 14) {
            wordArray.push(0)
        }
        wordArray.push(strLen >>> 29)
        wordArray.push((strLen << 3) & 0x0ffffffff)
        for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
            for (i = 0; i < 16; i++) {
                W[i] = wordArray[blockstart + i]
            }
            for (i = 16; i <= 79; i++) {
                W[i] = rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
            }
            A = H0
            B = H1
            C = H2
            D = H3
            E = H4
            for (i = 0; i <= 19; i++) {
                temp = (rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999)
                temp = 0x0ffffffff & temp;
                E = D
                D = C
                C = rotLeft(B, 30)
                B = A
                A = temp
            }
            for (i = 20; i <= 39; i++) {
                temp = (rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1)
                temp = 0x0ffffffff & temp;
                E = D
                D = C
                C = rotLeft(B, 30)
                B = A
                A = temp
            }
            for (i = 40; i <= 59; i++) {
                temp = (rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC)
                temp = 0x0ffffffff & temp;
                E = D
                D = C
                C = rotLeft(B, 30)
                B = A
                A = temp
            }
            for (i = 60; i <= 79; i++) {
                temp = (rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6)
                temp = 0x0ffffffff & temp;
                E = D
                D = C
                C = rotLeft(B, 30)
                B = A
                A = temp
            }
            H0 = (H0 + A) & 0x0ffffffff
            H1 = (H1 + B) & 0x0ffffffff
            H2 = (H2 + C) & 0x0ffffffff
            H3 = (H3 + D) & 0x0ffffffff
            H4 = (H4 + E) & 0x0ffffffff
        }
        H0 >>>= 0;
        H1 >>>= 0;
        H2 >>>= 0;
        H3 >>>= 0;
        H4 >>>= 0;
        return u32(H0) + u32(H1) + u32(H2) + u32(H3) + u32(H4);
    };
})();