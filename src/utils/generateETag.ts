export const prerender = false;

export async function generateETag(data: Object | Object[] | string) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
