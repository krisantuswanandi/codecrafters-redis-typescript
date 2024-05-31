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
