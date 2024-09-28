import stopwords from "~/shared/stopwords";

export function getQuoteKeywords (quote: string): string[] {
  const quoteNoPunct = quote.replace(/[.,/#!$%^?&*;:{}=\-_`~()]/g,"");
  const quoteForToken = quoteNoPunct.replace(/\s{2,}/g," ");
  const tokens = quoteForToken.split(" ").filter((token) => {
    token = token.toLowerCase();
    return !stopwords.includes(token);
  });
  return tokens;
}