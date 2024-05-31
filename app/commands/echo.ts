import { RespType, RespValue } from "../resp";
import * as ErrorType from "../error";

export function handler(cmd: string, args: string[]): RespValue {
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
}
