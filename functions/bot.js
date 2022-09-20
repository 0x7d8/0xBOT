// Log Function
exports.log = (type, uid, gid, msg) => {
    if (!type) {
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + uid + ' @ ' + gid + '] ' + msg)
    } else {
        console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + uid + ' @ ' + gid + '] ' + msg)
    }
}