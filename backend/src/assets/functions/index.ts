export async function hashPassword(password: string) {
  const encoder = new TextEncoder();

  const data = encoder.encode(password);

  // Use the SubtleCrypto API to hash the password with SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
