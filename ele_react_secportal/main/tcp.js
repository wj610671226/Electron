const net = require("net");
const options = {
  host: "127.0.0.1",
  port: 10318,
};

const tcp_client = net.Socket();

console.log("tcp init");

tcp_client.connect(options, function () {
  console.log("connected to Server");
//   tcp_client.write("I am tcp_client of node!");
});

// 接收数据
tcp_client.on("data", function (data) {
  console.log("received data: %s from server", data.toString());
  // 转json对象获取数据
//   const result = JSON.parse(data.toString());
//   console.log("received data type " + result.name);
});


tcp_client.on("end", function () {
  console.log("data end!");
});

tcp_client.on("error", function () {
  console.log("tcp_client error!");
});


function intConvertByte(number) {
    // const arr = new Int32Array(1)
    // arr[0] = 0;
    // const buf = Buffer.from(arr.buffer)
    // buf.writeInt32BE(number)

    const buf = Buffer.alloc(4, 0);
    buf.writeInt32BE(number);
    return buf;
}

const send = () => {
    const version = intConvertByte(1);
    console.log(version);
    console.log("-------")
    const cmd = intConvertByte(4);
    console.log(cmd);
    console.log("-------")
    const bodyString = "<?xml version='1.0' encoding='UTF-8' ?><AuthTerminalUI><Password>11111111aA</Password><UserName>wangjie</UserName><AuthType>2</AuthType><ServerUid>A6872065-B4F0-478B-8F3D-33DDDC399807</ServerUid><SvcType>1</SvcType></AuthTerminalUI>";
    const body = Buffer.from(bodyString);
    console.log(body);
    console.log("-------")
    const bodyLength = body.length;
    const tmpLength = intConvertByte(bodyLength);
    console.log(tmpLength);
    console.log("-------")
    const data_length = version.length + cmd.length + tmpLength.length + bodyLength;
    console.log("version.length %s cmd.length %s tmpLength.length %s bodyLength %s data_length %s", version.length , cmd.length , tmpLength.length , bodyLength, data_length);
    const buffer = Buffer.concat([version, cmd, tmpLength, body], data_length);
    tcp_client.write(buffer);
}

module.exports = {
    send
}
