export const encode = (value: string): string => {
  const encoded = Buffer.from(value).toString("base64");
  return encoded;
};