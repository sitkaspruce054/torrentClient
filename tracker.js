/**
 * This encapsulates the logic found in the tracker component
 */

const dgram = require('dgram');

const Buf = require('buffer').Buffer;

const urlParse = require('url').parse;

const url = urlParse(torFile.announce.toString('utf8'))

const socket = dgram.createSocket('udp4');


const crypto = require('crypto');


module.exports.getPeers = (tor,callback) => {
    const socket = dgram.createSocket('udp4');
    const url = torrent.announce.toString('utf8')

    //step 1: send a connect req

    udpSend(socket,buildConnReq(),url)
    
    socket.on('message', resp => {
        if(respType(resp) === 'connect') {
            const connectionResponse = parseConnResp(resp);

            const announceReq = buildAnnounceReq(connectionResponse.connectionId);
            udpSend(socket,announceReq,url);
        }else if(respType(response) === 'announce') {

            const announceResponse = parseAnnounceResp(resp);

            const announceReq = parseAnnounceResp(resp)

            callback(announceResponse.peers)
        }
    })
}
/**
 *  Helper function encapsulating the udp send
 * @param {} socket: the udp4 socket  
 * @param {*} message message we wish to send
 * @param {*} rawUrl the raw url
 * @param {*} callback 
 */
function udpSend(socket,message,rawUrl, callback=()=>{}) {
    const url = urlParse(rawUrl);
    socket.send(message,0,message.length,url.port, url.host, callback);
} 
/**
 * Parses the type of response, either as a connect or announce
 * @param {} resp 
 */
function respType(resp){

}

/**
 * Builds the connection request Based on the following specifications:
 * 
 * The first 8 bytes are a 64 bit integer, representing the connection_id with a value of
 * 0x4172701980
 * 
 * The next 4 bytes are a 32 bit integer with value 0.
 * 
 * The next 4 bytes represent a transaction ID
 */
function buildConnReq(){
    const buffer = Buf.alloc(16);
    buffer.writeUInt32BE(0x417, 0);
    buffer.writeUInt32BE(0x2701980,4)
    buffer.writeUInt32BE(0,8);
    var randNum = crypto.randomBytes(4)
    randNum.copy(buffer,12)

    return buffer
    

}

function buildAnnounceReq(connectionId,torrent,port=6881){

    buffer = Buf.allocUnsafe(98)
    connectionId.copy(buffer,0)
    buffer.writeUInt32BE(1,8)
   

}

function parseAnnounceResp(resp){

    

}

function parseConnResp(resp){

    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        connectionId: resp.readUInt32BE(8)

    }

}