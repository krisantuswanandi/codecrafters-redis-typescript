import * as net from "net";
import RESP from "./resp";
import { handleCommand } from "./commands";

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", async (data) => {
    const result = await handleCommand(data);
    connection.write(RESP.stringify(result));
  });
});

server.listen(6379, "127.0.0.1");
