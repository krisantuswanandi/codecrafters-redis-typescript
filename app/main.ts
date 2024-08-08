import * as net from "net";
import RESP from "./resp";
import { handleCommand } from "./commands";
import * as info from "./info";

const port = Number(process.argv[3]) || 6379;
const role = process.argv[5] ? "slave" : "master";

info.set("role", role);

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", async (data) => {
    const result = await handleCommand(data);
    connection.write(RESP.stringify(result));
  });
});

server.listen(port, "127.0.0.1");
console.log(`Server listening on port ${port}`);
