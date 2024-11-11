

export interface HashGenerator {
  encrypt(props: HashGeneratorProps): Promise<string>;
}
