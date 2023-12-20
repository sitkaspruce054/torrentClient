
const bencode = require('bencode.js');

const tracker = require('./tracker')

const fs = require('fs');

const torFile = bencode.decode(fs.readFileSync('puppy.torrent'));


tracker.getPeers(torFile,peers => {
    console.log('list of peers: ', peers)
})

