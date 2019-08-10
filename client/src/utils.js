export function join(channel) {
    // for local installs
    var protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
    // if you changed the port during the server config, change 'wsPath'
    // to the new port (example: ':8080')
    // if you are reverse proxying, change 'wsPath' to the new location
    // (example: '/chat-ws')
    var wsPath = ':6060';
    ws = new WebSocket(protocol + '//' + document.domain + wsPath);

    var wasConnected = false;

    ws.onopen = function () {
        if (!wasConnected) {
            if (location.hash) {
                myNick = location.hash.substr(1);
            } else {
                myNick = prompt('Nickname:', myNick);
            }
        }

        if (myNick) {
            localStorageSet('my-nick', myNick);
            send({ cmd: 'join', channel: channel, nick: myNick });
        }

        wasConnected = true;
    }

    // 断开连接后
    ws.onclose = function () {
        if (wasConnected) {
            pushMessage({ nick: '!', text: "Server disconnected. Attempting to reconnect. . ." });
        }

        window.setTimeout(function () {
            join(channel);
        }, 2000);
    }

    ws.onmessage = function (message) {
        var args = JSON.parse(message.data);
        var cmd = args.cmd;
        var command = COMMANDS[cmd];
        command.call(null, args);
    }
}
export function send(wx, data) {
    if (ws && ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify(data));
    }
}