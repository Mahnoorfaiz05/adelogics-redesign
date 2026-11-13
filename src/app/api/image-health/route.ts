import { projects } from "@/data/projects";
import { team } from "@/data/content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const imagePaths = Array.from(new Set([
  ...projects.flatMap((project) => [project.cover, ...project.gallery.map((image) => image.src)]),
  ...team.map((member) => member.image),
  "/images/brand/adelogix-logo-original.png",
  "/images/brand/adelogix-mark-original.png",
]));

async function inspectImage(origin: string, path: string) {
  try {
    const response = await fetch(new URL(path, origin), {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    return { path, status: response.status, contentType: response.headers.get("content-type") || "" };
  } catch {
    return { path, status: 0, contentType: "" };
  }
}

/**
 * Deployment-only image audit. It requests the public CDN paths from the same
 * origin as the live site, so a 200 result verifies the deployed static assets
 * rather than a local filesystem path.
 */
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const results: Awaited<ReturnType<typeof inspectImage>>[] = [];
  const batchSize = 8;

  for (let index = 0; index < imagePaths.length; index += batchSize) {
    results.push(...await Promise.all(imagePaths.slice(index, index + batchSize).map((path) => inspectImage(origin, path))));
  }

  const failed = results.filter((result) => result.status < 200 || result.status >= 300 || !result.contentType.startsWith("image/"));
  return Response.json({
    ok: failed.length === 0,
    origin,
    checked: results.length,
    failed,
  }, { status: failed.length ? 503 : 200 });
}
