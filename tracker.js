/**
 * This encapsulates the logic found in the tracker component
 */

const dgram = require('dgram');

const Buf = require('buffer').Buffer;

const urlParse = require('url').parse;

const url = urlParse(torFile.announce.toString('utf8'))

const socket = dgram.createSocket('udp4');

const msg1 = Buf.from('hello world!','utf8');

socket.send(msg1, 0, msg1.length, url.port, url.host, ()=> {});

socket.on('message', msg => {
    console.log('msg is',msg);
});