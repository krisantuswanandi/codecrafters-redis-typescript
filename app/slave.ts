import * as net from "net";
import RESP, { RespType } from "./resp";

export function init(host: string, port: number) {
  const socket = new net.Socket();
  socket.connect(port, host, () => {
    socket.write(
      RESP.stringify({
        type: RespType.Array,
        value: [{ type: RespType.Bulk, value: "PING" }],
      })
    );
  });
}
