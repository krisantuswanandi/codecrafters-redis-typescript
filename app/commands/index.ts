import RESP, { RespArray, RespType, type RespValue } from "../resp";
import * as ErrorType from "../error";

enum Command {
  Ping = "PING",
  Echo = "ECHO",
}

function parseCommand(data: Buffer): [string, string[]] {
  const raw = RESP.parse(data.toString()) as RespArray;
  const [cmd, ...args] = raw.value.map((item) => item.value as string);
  return [cmd, args];
}

export function handleCommand(data: Buffer): RespValue {
  const [cmd, args] = parseCommand(data);
  if (!cmd) {
    return {
      type: RespType.Error,
      value: ErrorType.invalidCommand(),
    };
  }

  switch (cmd.toUpperCase()) {
    case Command.Ping:
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
