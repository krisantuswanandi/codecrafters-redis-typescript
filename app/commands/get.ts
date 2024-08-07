import { RespType, RespValue } from "../resp";
import * as storage from "../storage";
import * as ErrorType from "../error";

export function handler(cmd: string, args: string[]): RespValue {
  if (args.length < 1) {
    return {
      type: RespType.Error,
      value: ErrorType.wrongNumberOfArguments(cmd),
    };
  }
  const value = storage.get(args[0]);
  return { type: RespType.Bulk, value: value || null };
}
