import * as net from "net";
import RESP from "./resp";
import { handleCommand } from "./commands";

let port = 6379;
if (process.argv.length > 3 && process.argv[2] === "--port") {
  port = Number(process.argv[3]);
}

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", async (data) => {
    const result = await handleCommand(data);
    connection.write(RESP.stringify(result));
  });
});

server.listen(port, "127.0.0.1");
console.log(`Server listening on port ${port}`);
