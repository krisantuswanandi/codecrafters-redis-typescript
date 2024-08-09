import { RespType, RespValue } from "../resp";
import * as info from "../info";

export function handler(_cmd: string, _args: string[]): RespValue {
  const replicationInfo = {
    role: info.get("role"),
    master_replid: info.get("master_replid"),
    master_repl_offset: 0,
  };
  const replicationInfoStr = Object.entries(replicationInfo)
    .map((i) => `${i[0]}:${i[1]}`)
    .join("\n");
  return { type: RespType.Bulk, value: `# Replication\n${replicationInfoStr}` };
}
