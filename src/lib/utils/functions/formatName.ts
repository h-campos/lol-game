export const formatName = (input: string): string => {
  const nameWithoutApostrophe = input.replace("'", "");
  nameWithoutApostrophe.toLowerCase();
  const formattedName = nameWithoutApostrophe
    .replace(/\w+/g, match => match.charAt(0).toUpperCase() + match.slice(1))
    .replace(/\s/g, "");
  return formattedName;
};