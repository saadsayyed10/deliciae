/* backend\src\lib\crypto.ts */

// Secret key for username encryption/decryption (lowercase alphabets only)
const SECRET_KEY = process.env.CIPHER_KEY;

// Function to encrypt viewer username (ensuring output strictly contains lowercase 26 English alphabets)
export const encryptViewerUsername = (username: string): string => {
  if (!username) return "";
  let encrypted = "";
  const keyLength = SECRET_KEY!.length;

  for (let i = 0; i < username.length; i++) {
    const char = username[i];
    const charCode = char.charCodeAt(0);

    // Check if character is a lowercase English alphabet (a-z)
    if (charCode >= 97 && charCode <= 122) {
      const shift = SECRET_KEY!.charCodeAt(i % keyLength) - 97;
      const encryptedCharCode = ((charCode - 97 + shift) % 26) + 97;
      encrypted += String.fromCharCode(encryptedCharCode);
    } else {
      // Non-alphabet characters pass through or handled
      encrypted += char;
    }
  }

  return encrypted;
};

// Function to decrypt viewer username back to original form
export const decryptViewerUsername = (encryptedUsername: string): string => {
  if (!encryptedUsername) return "";
  let decrypted = "";
  const keyLength = SECRET_KEY!.length;

  for (let i = 0; i < encryptedUsername.length; i++) {
    const char = encryptedUsername[i];
    const charCode = char.charCodeAt(0);

    // Check if character is a lowercase English alphabet (a-z)
    if (charCode >= 97 && charCode <= 122) {
      const shift = SECRET_KEY!.charCodeAt(i % keyLength) - 97;
      let decryptedCharCode = (charCode - 97 - shift) % 26;
      if (decryptedCharCode < 0) {
        decryptedCharCode += 26;
      }
      decryptedCharCode += 97;
      decrypted += String.fromCharCode(decryptedCharCode);
    } else {
      // Non-alphabet characters pass through
      decrypted += char;
    }
  }

  return decrypted;
};
