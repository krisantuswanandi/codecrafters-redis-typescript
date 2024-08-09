import * as net from "net";
import RESP from "./resp";

let step = 0;

export function init(masterHost: string, masterPort: number, port: number) {
  const socket = new net.Socket();
  socket.connect(masterPort, masterHost, () => {
    socket.on("data", () => {
      if (step === 0) {
        socket.write(RESP.command(`REPLCONF listening-port ${port}`));
      } else if (step === 1) {
        socket.write(RESP.command("REPLCONF capa psync2"));
      } else if (step === 2) {
        socket.write(RESP.command("PSYNC ? -1"));
      }
      step++;
    });
    socket.write(RESP.command("PING"));
  });
}
