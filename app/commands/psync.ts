import { RespType, RespValue } from "../resp";
import * as info from "../info";
import * as replica from "../replica";
import { Socket } from "net";

const empty = `UkVESVMwMDEx+glyZWRpcy12ZXIFNy4yLjD6CnJlZGlzLWJpdHPAQPoFY3RpbWXCbQi8ZfoIdXNlZC1tZW3CsMQQAPoIYW9mLWJhc2XAAP/wbjv+wP9aog==`;
const file = Buffer.from(empty, "base64");

export function handler(
  _cmd: string,
  _args: string[],
  connection: Socket
): RespValue {
  replica.add(connection);
  const replid = info.get("master_replid");
  // don't try this at home
  setTimeout(() => {
    connection.write(`$${file.length}\r\n`);
    connection.write(file);
  });
  return { type: RespType.String, value: `FULLRESYNC ${replid} 0` };
}
