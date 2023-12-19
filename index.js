'use strict';

const bencode = require('bencode.js');



const fs = require('fs');

const torFile = bencode.decode(fs.readFileSync('puppy.torrent'));

console.log(torFile.announce.toString('utf8'));

