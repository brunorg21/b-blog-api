export interface HashCompareProps {
  hash: string;
  value: string;
}

export interface HashGeneratorProps {
  salt: number;
  value: string;
}

export interface Hasher {
  compare(props: HashCompareProps): Promise<boolean>;
  encrypt(props: HashGeneratorProps): Promise<string>;
}
