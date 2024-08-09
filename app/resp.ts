export enum RespType {
  String = "+",
  Error = "-",
  Integer = ":",
  Bulk = "$",
  Array = "*",
}

export type RespInteger = {
  type: RespType.Integer;
  value: number;
};
export type RespString = {
  type: RespType.String;
  value: string;
};
export type RespError = {
  type: RespType.Error;
  value: Error;
};
export type RespBulk = {
  type: RespType.Bulk;
  value: string | null;
};
export type RespArray = {
  type: RespType.Array;
  value: RespValue[];
};
export type RespValue =
  | RespInteger
  | RespString
  | RespError
  | RespBulk
  | RespArray;

const CRLF = "\r\n";

export function parse(data: string): RespValue {
  let cursor = 0;

  function readLine() {
    const end = data.indexOf("\r\n", cursor);
    const line = data.slice(cursor, end);
    cursor = end + 2;
    return line;
  }

  function readInteger() {
    const line = readLine();
    return parseInt(line, 10);
  }

  function readError() {
    const line = readLine();
    return new Error(line);
  }

  function readBulk() {
    const len = readInteger();
    if (len < 0) {
      cursor += 2;
      return null;
    } else {
      const end = cursor + len;
      const value = data.slice(cursor, end);
      cursor = end + 2;
      return value;
    }
  }

  function readArray() {
    const len = readInteger();
    const arr: RespValue[] = [];
    for (let i = 0; i < len; i++) {
      arr.push(read());
    }
    return arr;
  }

  function read(): RespValue {
    const respType = data[cursor++];
    switch (respType) {
      case RespType.String:
        return {
          type: respType,
          value: readLine(),
        };
      case RespType.Error:
        return {
          type: respType,
          value: readError(),
        };
      case RespType.Integer:
        return {
          type: respType,
          value: readInteger(),
        };
      case RespType.Bulk:
        return {
          type: respType,
          value: readBulk(),
        };
      case RespType.Array:
        return {
          type: respType,
          value: readArray(),
        };
      default:
        throw new Error("Not parsable");
    }
  }

  return read();
}

export function stringify(data: RespValue) {
  function read(data: RespValue): string {
    switch (data.type) {
      case RespType.Integer:
        return `${data.type}${data.value}${CRLF}`;
      case RespType.String:
        return `${data.type}${data.value}${CRLF}`;
      case RespType.Error:
        return `${data.type}${data.value.message}${CRLF}`;
      case RespType.Bulk:
        if (data.value) {
          return `${data.type}${data.value.length}${CRLF}${data.value}${CRLF}`;
        } else {
          return `${data.type}-1${CRLF}`;
        }
      case RespType.Array:
        let value = "";
        for (const item of data.value) {
          value += read(item);
        }
        return `${data.type}${data.value.length}${CRLF}${value}`;
    }
  }

  return read(data);
}

export function command(command: string) {
  return stringify({
    type: RespType.Array,
    value: command.split(" ").map((c) => ({ type: RespType.Bulk, value: c })),
  });
}

export default {
  parse,
  stringify,
  command,
};
