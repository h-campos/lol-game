export type DialogGameProps = {
  title: string;
  description: string;
  loading: boolean;
  result: "win" | "loose" | "";
}