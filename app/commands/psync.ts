import { RespType, RespValue } from "../resp";
import * as info from "../info";

export function handler(_cmd: string, _args: string[]): RespValue {
  const replid = info.get("master_replid");
  return { type: RespType.String, value: `FULLRESYNC ${replid} 0` };
}
