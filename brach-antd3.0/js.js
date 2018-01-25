var Rsa = require('node-rsa');
var fs = require('fs');
var privatePem = fs.readFileSync('./rsa_private_key.pem').toString();
var publicPem = fs.readFileSync('./rsa_public_key.pem').toString();

var text = '123';

var public_key = new Rsa(publicPem);

var private_key = new Rsa(privatePem);

public_key.setOptions({encryptionScheme: 'pkcs1'});

private_key.setOptions({encryptionScheme: 'pkcs1'});

console.log('text：', text);

var encrypted = public_key.encrypt(text, 'base64');

console.log('encrypted: ', encrypted);

var encrypted2  = 'qbgE7MWgCegxGArgwQgUaGuv/g8V9Ls11F8QTL/nhmnYr5KxVO/Z2A4A9NgGjCgwlERokgwFi86VR9Y91xgJViSnojKuOwjuLGR+P7yoYd4IKiPCtOkzN3UbE00xqxCXSh+SQDUGrbWvtxCA+vdCtFsZEWhhif7dFus+BA0dgxk=';

var decrypted = private_key.decrypt(encrypted2, 'utf8');

console.log('decrypted: ', decrypted);
