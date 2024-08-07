import { RespType, RespValue } from "../resp";
import * as storage from "../storage";
import * as ErrorType from "../error";

export function handler(cmd: string, args: string[]): RespValue {
  if (args.length < 2) {
    return {
      type: RespType.Error,
      value: ErrorType.wrongNumberOfArguments(cmd),
    };
  }
  storage.set(args[0], args[1]);
  return { type: RespType.String, value: "OK" };
}
