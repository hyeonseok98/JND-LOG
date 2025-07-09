export default function resizeThumbnail(url: string | null) {
  if (!url) return null;
  return url.replace("{type}", "720");
}
