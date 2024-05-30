import * as net from "net";
import resp, { RespType } from "./resp";

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", () => {
    connection.write(resp.stringify({ type: RespType.String, value: "PONG" }));
  });
});

server.listen(6379, "127.0.0.1");
