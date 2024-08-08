import { RespType, RespValue } from "../resp";
import * as storage from "../storage";
import * as ErrorType from "../error";
import type { StorageConfig } from "../storage";

export function handler(cmd: string, args: string[]): RespValue {
  if (args.length < 2) {
    return {
      type: RespType.Error,
      value: ErrorType.wrongNumberOfArguments(cmd),
    };
  }

  const config: StorageConfig = {};

  if (args[2]?.toLowerCase() === "px" && args[3]) {
    const px = Number(args[3]);
    if (!Number.isInteger(px)) {
      return {
        type: RespType.Error,
        value: ErrorType.notInteger(),
      };
    } else if (px < 1) {
      return {
        type: RespType.Error,
        value: ErrorType.invalidExpireTime(cmd),
      };
    }
    config.expiredAt = Date.now() + px;
  } else if (args[2]) {
    return {
      type: RespType.Error,
      value: ErrorType.syntaxError(),
    };
  }

  storage.set(args[0], args[1], config);
  return { type: RespType.String, value: "OK" };
}
