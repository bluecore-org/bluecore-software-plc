const siteName = "Bluecore Software PLC";
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

// Keep <title> within ~60 characters so search results don't truncate it:
// prefer the full brand suffix, then a short one, then the bare title.
export function buildTitle(pageTitle) {
  for (const suffix of [siteName, "Bluecore"]) {
    const full = `${pageTitle} | ${suffix}`;
    if (full.length <= MAX_TITLE) return full;
  }
  return pageTitle;
}

// Keep meta descriptions within 160 characters: keep whole sentences where
// possible, otherwise cut at a word boundary and add an ellipsis.
export function buildDescription(text) {
  if (!text || text.length <= MAX_DESCRIPTION) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > MAX_DESCRIPTION) break;
    out += sentence;
  }
  if (out.trim().length >= 70) return out.trim();
  const cut = text.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:\-\u2013\u2014]+$/, "")}\u2026`;
}
