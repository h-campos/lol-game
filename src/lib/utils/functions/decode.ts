export const decode = (value: string): string => {
  const decoded = Buffer.from(value, "base64").toString("utf-8");
  return decoded;
};