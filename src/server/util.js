var crypto = require('crypto');

exports.sha1 = function (str) {
    var md5sum = crypto.createHash('sha1');
    md5sum.update(str, 'utf8');
    str = md5sum.digest('hex');
    return str;
}

exports.SERVER = 'https://gifmaker.develophelper.com/';