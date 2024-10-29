import {
  HashCompare,
  HashCompareProps,
} from "@/domain/cryptography/hash-compare";
import {
  HashGenerator,
  HashGeneratorProps,
} from "@/domain/cryptography/hash-generator";
import { compare, hash } from "bcrypt";

export class BcryptHasher implements HashCompare, HashGenerator {
  async encrypt({ salt, value }: HashGeneratorProps): Promise<string> {
    const valueHashed = await hash(value, salt);

    return valueHashed;
  }
  async compare({ hash, value }: HashCompareProps): Promise<boolean> {
    const isEqual = await compare(value, hash);

    return isEqual;
  }
}
