import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import { EntryContext } from "@remix-run/node";

const cache = createCache({ key: "css" });
const { extractCriticalToChunks } = createEmotionServer(cache);

type EmotionCriticalToChunks = {
  html: string;
  styles: {
    key: string;
    ids: string[];
    css: string;
  }[];
};

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const html = renderToString(
    <CacheProvider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>
  );

  const emotionChunks: EmotionCriticalToChunks = extractCriticalToChunks(html);

  const emotionStyles = emotionChunks.styles
    .map(
      (style) =>
        `<style data-emotion="${style.key} ${style.ids.join(" ")}">${style.css}</style>`
    )
    .join("");

  const markup = `<!DOCTYPE html>
<html lang="en">
  <head>${emotionStyles}</head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`;

  responseHeaders.set("Content-Type", "text/html");

  return new Response(markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
