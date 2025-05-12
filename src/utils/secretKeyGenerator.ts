import crypto from 'crypto';

const secretKeyGenerator = (length: number = 32): string => {
    // Generate a random string with the specified length (default is 32 bytes)
    return crypto.randomBytes(length).toString('hex');  // Converts to a hexadecimal string
}

if (require.main === module) {
  console.log("Generated JWT Secret:", secretKeyGenerator());
}

export default secretKeyGenerator;

