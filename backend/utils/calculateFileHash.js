import crypto from "crypto";
import fs from "fs";

export default function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    // 1. Create a SHA-256 hasher
    const hash = crypto.createHash("sha256");

    // 2. Open the file as a stream (reads chunk by chunk)
    const stream = fs.createReadStream(filePath);

    // 3. As data flows in, update the hash
    stream.on("data", (chunk) => hash.update(chunk));

    // 4. When file ends, output the fingerprint (Hex string)
    stream.on("end", () => resolve(hash.digest("hex")));

    stream.on("error", (err) => reject(err));
  });
}
