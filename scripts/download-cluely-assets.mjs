import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const targetUrl = "https://cluely.com/";
const targetOrigin = new URL(targetUrl).origin;
const extractionPath = path.join(root, "docs/research/cluely.com/global-extraction.json");
const imageDir = path.join(root, "public/images/cluely");
const videoDir = path.join(root, "public/videos/cluely");
const seoDir = path.join(root, "public/seo/cluely");

const extraction = JSON.parse(await readFile(extractionPath, "utf8"));
const mediaExtensions =
  "png|jpe?g|webp|avif|gif|svg|webm|mp4|mov|ico|webmanifest|json";
const mediaUrlPattern = new RegExp(
  `(?:https?:\\/\\/[^"'\\s)<>]+|\\/[^"'\\s)<>]+?)\\.(?:${mediaExtensions})(?:\\?[^"'\\s)<>]*)?`,
  "gi",
);
const relativeMediaPattern = new RegExp(
  `(?:^|["'(])((?:_next\\/static\\/media|images|videos|favicon|patterns|social-previews)\\/[^"'()\\s,]+?\\.(?:${mediaExtensions})(?:\\?[^"'()\\s,]+)?)`,
  "gi",
);
const linkedTextPattern = /(?:src|href)=["']([^"']+\.(?:js|css|json|webmanifest)(?:\?[^"']*)?)["']/gi;

function urlsFromCss(value) {
  const matches = [...String(value).matchAll(/url\(["']?([^"')]+)["']?\)/g)];
  return matches.map((match) => match[1]);
}

function normalizeUrl(value) {
  if (!value) return undefined;
  const trimmed = String(value).trim().replaceAll("\\/", "/");
  if (
    !trimmed ||
    /^(?:data|blob|mailto|tel|javascript):/i.test(trimmed)
  ) {
    return undefined;
  }

  const url = new URL(trimmed, targetUrl);
  if (url.origin !== targetOrigin) return undefined;
  if (url.pathname.includes("/.")) return undefined;

  if (url.pathname === "/_next/image") {
    const optimizedSource = url.searchParams.get("url");
    if (optimizedSource) {
      return normalizeUrl(decodeURIComponent(optimizedSource));
    }
  }

  if (
    url.pathname.endsWith(".json") &&
    !/manifest\.json$/i.test(url.pathname)
  ) {
    return undefined;
  }

  url.hash = "";
  return url.href;
}

function sourceName(rawUrl) {
  const url = new URL(rawUrl);
  const optimizedSource = url.searchParams.get("url");
  const sourcePath = optimizedSource ? decodeURIComponent(optimizedSource) : url.pathname;
  const clean = sourcePath
    .replace(/^\/+/, "")
    .replace(/^_next\/static\/media\//, "")
    .replace(/^images\/pages\/home\//, "")
    .replace(/^favicon\//, "")
    .replace(/^patterns\//, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-");
  return clean || "asset";
}

function collectFromText(text) {
  const urls = [];
  for (const match of String(text).matchAll(mediaUrlPattern)) {
    urls.push(match[0]);
  }
  for (const match of String(text).matchAll(relativeMediaPattern)) {
    urls.push(`/${match[1]}`);
  }
  return urls.map(normalizeUrl).filter(Boolean);
}

function textLinksFrom(text) {
  return [...String(text).matchAll(linkedTextPattern)]
    .map((match) => normalizeUrl(match[1]))
    .filter(Boolean);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) return "";
  return response.text();
}

async function crawlLiveAssetReferences() {
  const textUrls = new Set([targetUrl]);
  const visited = new Set();
  const discovered = new Set();

  for (const url of textUrls) {
    if (visited.has(url) || visited.size > 80) continue;
    visited.add(url);

    const text = await fetchText(url);
    for (const assetUrl of collectFromText(text)) {
      discovered.add(assetUrl);
    }

    for (const linkedUrl of textLinksFrom(text)) {
      if (
        linkedUrl.startsWith(`${targetOrigin}/_next/static/`) ||
        linkedUrl.endsWith("/manifest.json")
      ) {
        textUrls.add(linkedUrl);
        if (linkedUrl.endsWith("/manifest.json")) {
          discovered.add(linkedUrl);
        }
      }
    }
  }

  return {
    discovered: [...discovered],
    scannedTextUrls: [...visited],
  };
}

function destinationFor(rawUrl) {
  const url = new URL(rawUrl);
  const pathname = url.pathname.toLowerCase();
  if (/\.(?:webm|mp4|mov)$/i.test(pathname)) return videoDir;
  if (
    pathname.includes("/favicon/") ||
    pathname.endsWith("/manifest.json") ||
    pathname.includes("/social-previews/")
  ) {
    return seoDir;
  }
  return imageDir;
}

async function uniqueAssetList() {
  const imageSources = extraction.images.map((asset) => asset.src).filter(Boolean);
  const videoSources = extraction.videos
    .flatMap((asset) => [asset.src, asset.poster])
    .filter(Boolean);
  const backgroundSources = extraction.backgrounds.flatMap((asset) =>
    urlsFromCss(asset.backgroundImage ?? asset),
  );
  const seoSources = [
    ...extraction.favicons.map((asset) => asset.href).filter(Boolean),
    ...extraction.metas
      .filter((meta) => /image/.test(`${meta.name ?? ""}${meta.property ?? ""}`))
      .map((meta) => meta.content)
      .filter((content) => /^https?:\/\//.test(content))
      .filter(Boolean),
  ];
  const crawl = await crawlLiveAssetReferences();

  const grouped = [
    ...imageSources.map((url) => ({ url: normalizeUrl(url), dir: imageDir })),
    ...videoSources.map((url) => ({ url: normalizeUrl(url), dir: videoDir })),
    ...backgroundSources.map((url) => ({ url: normalizeUrl(url), dir: imageDir })),
    ...seoSources.map((url) => ({ url: normalizeUrl(url), dir: seoDir })),
    ...crawl.discovered.map((url) => ({ url, dir: destinationFor(url) })),
  ].filter((asset) => asset.url);

  const seen = new Set();
  const assets = grouped.filter((asset) => {
    const key = `${asset.dir}:${sourceName(asset.url)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    assets,
    crawl,
  };
}

async function download(asset, index) {
  const fileName = sourceName(asset.url);
  const filePath = path.join(asset.dir, fileName);
  const response = await fetch(asset.url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${asset.url}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(filePath, bytes);
  return {
    index,
    url: asset.url,
    file: path.relative(root, filePath),
    bytes: bytes.length,
  };
}

await mkdir(imageDir, { recursive: true });
await mkdir(videoDir, { recursive: true });
await mkdir(seoDir, { recursive: true });

const { assets, crawl } = await uniqueAssetList();
const results = [];
const failures = [];
const concurrency = 4;

for (let i = 0; i < assets.length; i += concurrency) {
  const batch = assets.slice(i, i + concurrency);
  const settled = await Promise.allSettled(
    batch.map((asset, offset) => download(asset, i + offset)),
  );
  for (const item of settled) {
    if (item.status === "fulfilled") {
      results.push(item.value);
    } else {
      failures.push(item.reason.message);
    }
  }
}

const manifest = {
  downloadedAt: new Date().toISOString(),
  count: results.length,
  attempted: assets.length,
  scannedTextUrls: crawl.scannedTextUrls,
  discoveredAssetUrls: crawl.discovered,
  failures,
  assets: results.sort((a, b) => a.index - b.index),
};

await writeFile(
  path.join(root, "docs/research/cluely.com/downloaded-assets.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(JSON.stringify(manifest, null, 2));
