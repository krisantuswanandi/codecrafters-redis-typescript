import { RespType, RespValue } from "../resp";

export function handler(_cmd: string, args: string[]): RespValue {
  return { type: RespType.String, value: `FULLRESYNC ${args[0]} 0` };
}
