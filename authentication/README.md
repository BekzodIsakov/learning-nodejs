## is jwt.sign() encryption or hashing?
jwt.sign() is neither encryption nor hashing in the traditional sense; it is used to create signed tokens using a technique called digital signing.

Here’s how it works:

### What is jwt.sign()?
- jwt.sign() generates a JWT (JSON Web Token). A JWT consists of three parts:
  1. Header: Contains the algorithm and token type.
  2. Payload: The data or claims (such as user ID or email) being encoded in the token.
  3. Signature: A cryptographic signature created using the specified algorithm (e.g., HMAC SHA256).

### Is jwt.sign() encryption?
- No, jwt.sign() does not encrypt the data. The payload of a JWT is base64-encoded, not encrypted, which means anyone who gets the token can decode and read the payload.
- The token can be read easily without needing a secret key. So, it is not secure from eavesdropping if intercepted by unauthorized parties.

### Is jwt.sign() hashing?
- No, it's not hashing either, though hashing is part of the signing process. The purpose of jwt.sign() is to create a signature using a hashing algorithm (e.g., HMAC SHA256). This signature ensures:
  - Data integrity: Verifies that the payload hasn’t been tampered with.
  - Authentication: Ensures the token was signed by a trusted party using a secret key (in the case of HMAC) or a private key (in asymmetric algorithms like RSA).

### What does jwt.sign() do?
1. Generates a signature: It takes the encoded header and payload, hashes them using a secret key (or private key in the case of asymmetric signing algorithms), and appends the signature to the token.
2. Ensures integrity: When verifying (jwt.verify()), the signature is recalculated and compared to ensure the token hasn't been tampered with.
   
<code>
  const jwt = require("jsonwebtoken");

  const myFunction = async => {
    const token = jwt.sign({_id: "abc123"}, "secretkey", {expiresIn: "2 days})
    const data = jwt.verify(token, "secretkey")
  }
</code>