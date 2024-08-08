import RESP, { RespArray, RespType, type RespValue } from "../resp";
import * as ErrorType from "../error";

function parseCommand(data: Buffer): [string, string[]] {
  const raw = RESP.parse(data.toString()) as RespArray;
  const [cmd, ...args] = raw.value.map((item) => item.value as string);
  return [cmd, args];
}

export async function handleCommand(data: Buffer): Promise<RespValue> {
  const [cmd, args] = parseCommand(data);
  if (!cmd) {
    return {
      type: RespType.Error,
      value: ErrorType.invalidCommand(),
    };
  }

  try {
    const { handler } = await import(`./${cmd.toLowerCase()}`);
    return handler(cmd, args);
  } catch (e: any) {
    console.log(e);
    return {
      type: RespType.Error,
      value: ErrorType.unknownCommand(cmd, args),
    };
  }
}
