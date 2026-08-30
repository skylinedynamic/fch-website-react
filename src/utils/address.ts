/**
 * Formats address text by normalizing line breaks and trimming whitespace.
 * 
 * @param text The address text to format
 * @returns Formatted address string
 */
export const formatAddress = (text: string = ""): string => {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")   // normalize Windows line breaks
    .trim();
};
