export interface HashCompareProps {
  hash: string;
  value: string;
}

export interface HashCompare {
  compare(props: HashCompareProps): Promise<boolean>;
}
