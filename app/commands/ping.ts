import { RespType, RespValue } from "../resp";

export function handler(_cmd: string, _args: string[]): RespValue {
  return { type: RespType.String, value: "PONG" };
}
