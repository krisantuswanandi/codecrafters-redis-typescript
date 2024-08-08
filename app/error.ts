export function invalidCommand() {
  return new Error("ERR invalid command");
}

export function wrongNumberOfArguments(cmd: string) {
  return new Error(`ERR wrong number of arguments for '${cmd}' command`);
}

export function unknownCommand(cmd: string, args: string[]) {
  const _args = args.map((arg) => `'${arg}'`).join(" ");
  const msg = `ERR unknown command '${cmd}', with args beginning with: ${_args}`;
  return new Error(msg);
}

export function syntaxError() {
  return new Error("ERR syntax error");
}

export function notInteger() {
  return new Error("ERR value is not an integer or out of range");
}

export function invalidExpireTime(cmd: string) {
  return new Error(`ERR invalid expire time in '${cmd}' command`);
}
