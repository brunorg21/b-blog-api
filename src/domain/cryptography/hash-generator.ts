export interface HashGeneratorProps {
  salt: number;
  value: string;
}

export interface HashGenerator {
  encrypt(props: HashGeneratorProps): Promise<string>;
}
