import * as net from "net";
import RESP, { RespArray, RespType, type RespValue } from "./resp";

enum Command {
  Pong = "PONG",
}

function handleCommand(data: Buffer): RespValue {
  const rawArgs = RESP.parse(data.toString()) as RespArray;
  const args = rawArgs.value.map((item) => item.value as string);
  const cmd = args[0];

  switch (cmd.toUpperCase()) {
    case Command.Pong:
      return { type: RespType.String, value: "PONG" };
    default:
      const _args = args
        .slice(1)
        .map((arg) => `'${arg}'`)
        .join(" ");
      const msg = `ERR unknown command '${cmd}', with args beginning with: ${_args}`;
      return {
        type: RespType.Error,
        value: new Error(msg),
      };
  }
}

const server: net.Server = net.createServer((connection: net.Socket) => {
  connection.on("data", (data) => {
    const result = handleCommand(data);
    connection.write(RESP.stringify(result));
  });
});

server.listen(6379, "127.0.0.1");
