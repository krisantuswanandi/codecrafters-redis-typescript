import * as net from "net";
import RESP from "./resp";
import { handleCommand } from "./commands";
import * as slave from "./slave";
import * as info from "./info";

const port = Number(process.argv[3]) || 6379;
const role = process.argv[5] ? "slave" : "master";

info.set("role", role);
info.set("master_replid", "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb");

if (role === "slave") {
  const [masterHost, masterPort] = process.argv[5].split(" ");
  slave.init(masterHost, Number(masterPort), port);
}

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", async (data) => {
    const result = await handleCommand(data);
    connection.write(RESP.stringify(result));
  });
});

server.listen(port, "127.0.0.1");
console.log(`Server listening on port ${port}`);
