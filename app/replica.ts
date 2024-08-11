import { Socket } from "net";

const WRITE_COMMANDS = ["set"];

const replicas: Socket[] = [];

export function add(replica: Socket) {
  replicas.push(replica);
}

export function propagate(data: Buffer) {
  replicas.forEach((replica) => {
    replica.write(data);
  });
}

export function shouldPropagate(cmd: string) {
  return WRITE_COMMANDS.includes(cmd.toLowerCase());
}
