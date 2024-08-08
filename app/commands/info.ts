import { RespType, RespValue } from "../resp";
import * as info from "../info";

export function handler(_cmd: string, _args: string[]): RespValue {
  const role = info.get("role");
  return { type: RespType.Bulk, value: `# Replication\nrole:${role}` };
}
