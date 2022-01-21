function add(a, b) {
    a = '0' + a;
    b = '0' + b;
    const aArr = a.split('');
    const bArr = b.split('');
    const aLen = aArr.length;
    const bLen = bArr.length;
    const result = [];
    let flag = 0;
    if (aLen > bLen) {
        for (i = 0; i < aLen - bLen; i++) {
            bArr.unshift('0');
        }
    } else {
        for (i = 0; i < bLen - aLen; i++) {
            aArr.unshift('0')
        }
    }
    for (let i = aArr.length - 1; i >= 0; i--) {
        const re = +aArr[i] + +bArr[i] + flag;
        if (re >= 10) {
            result[i] = re % 10;
            flag = 1;
        } else {
            result[i] = re;
            flag = 0
        }
    }
    return result.join('').replace(/^0/g, '');
}

module.exports = {
    add,
}