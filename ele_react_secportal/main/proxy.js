const path = require('path');
const { exec } = require('child_process');

function launch_proxy() {
    const launchPath = path.resolve(__dirname, './shell/launch_proxy.sh');
    exec(launchPath,  (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("launch_proxy success")
    })
}


function stop_proxy() {
    const stopPath = path.resolve(__dirname, './shell/stop_proxy.sh');
    exec(stopPath,  (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("stop_proxy success")
    })
}

module.exports = {
    launch_proxy,
    stop_proxy
}