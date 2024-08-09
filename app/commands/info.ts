import { RespType, RespValue } from "../resp";
import * as info from "../info";

export function handler(_cmd: string, _args: string[]): RespValue {
  const role = info.get("role");
  const replicationInfo = {
    role: info.get("role"),
    master_replid: "8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb",
    master_repl_offset: 0,
  };
  const replicationInfoStr = Object.entries(replicationInfo)
    .map((i) => `${i[0]}:${i[1]}`)
    .join("\n");
  return { type: RespType.Bulk, value: `# Replication\n${replicationInfoStr}` };
}
