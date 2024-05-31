import * as net from "net";
import RESP, { RespArray, RespType, type RespValue } from "./resp";
import * as ErrorType from "./error";

enum Command {
  Pong = "PONG",
  Echo = "ECHO",
}

function parseCommand(data: Buffer): [string, string[]] {
  const raw = RESP.parse(data.toString()) as RespArray;
  const [cmd, ...args] = raw.value.map((item) => item.value as string);
  return [cmd, args];
}

function handleCommand(data: Buffer): RespValue {
  const [cmd, args] = parseCommand(data);
  if (!cmd) {
    return {
      type: RespType.Error,
      value: ErrorType.invalidCommand(),
    };
  }

  switch (cmd.toUpperCase()) {
    case Command.Pong:
      return { type: RespType.String, value: "PONG" };
    case Command.Echo:
      if (args.length !== 1) {
        return {
          type: RespType.Error,
          value: ErrorType.wrongNumberOfArguments(cmd),
        };
      }
      return {
        type: RespType.Bulk,
        value: args[0],
      };
    default:
      return {
        type: RespType.Error,
        value: ErrorType.unknownCommand(cmd, args),
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
