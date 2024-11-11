import {
  HashGeneratorProps,
  HashCompareProps,
  Hasher,
} from "@/domain/cryptography/hasher";

import { compare, hash } from "bcrypt";

export class BcryptHasher implements Hasher {
  async encrypt({ salt, value }: HashGeneratorProps): Promise<string> {
    const valueHashed = await hash(value, salt);

    return valueHashed;
  }
  async compare({ hash, value }: HashCompareProps): Promise<boolean> {
    const isEqual = await compare(value, hash);

    return isEqual;
  }
}
