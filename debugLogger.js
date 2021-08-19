const isDebugActive = false;

function debug(message) {
    if (isDebugActive) console.log(message);
}

module.exports = debug;