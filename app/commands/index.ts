import RESP, { RespArray, RespType, type RespValue } from "../resp";
import * as replica from "../replica";
import * as ErrorType from "../error";
import { Socket } from "net";

function parseCommand(data: Buffer): [string, string[]] {
  const raw = RESP.parse(data.toString()) as RespArray;
  const [cmd, ...args] = raw.value.map((item) => item.value as string);
  return [cmd, args];
}

export async function handleCommand(
  data: Buffer,
  connection: Socket
): Promise<RespValue> {
  const [cmd, args] = parseCommand(data);
  if (!cmd) {
    return {
      type: RespType.Error,
      value: ErrorType.invalidCommand(),
    };
  }

  if (replica.shouldPropagate(cmd.toLowerCase())) {
    setTimeout(() => replica.propagate(data));
  }

  try {
    const { handler } = await import(`./${cmd.toLowerCase()}`);
    return handler(cmd, args, connection);
  } catch (e: any) {
    console.log(e);
    return {
      type: RespType.Error,
      value: ErrorType.unknownCommand(cmd, args),
    };
  }
}
