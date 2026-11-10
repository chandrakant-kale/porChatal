const crypto = require("crypto");

const CSRF_SECRET = process.env.JWT_SECRET;

const createSignature = (token, authToken) => {
  return crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(`${token}:${authToken}`)
    .digest("hex");
};

const generateCsrfToken = (authToken) => {
  const token = crypto.randomBytes(32).toString("hex");
  const signature = createSignature(token, authToken);

  return `${token}.${signature}`;
};

const verifyCsrfToken = (token, authToken) => {
  if (
    typeof token !== "string" ||
    typeof authToken !== "string"
  ) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) return false;

  const [randomToken, signature] = parts;

  if (
    !/^[a-f0-9]{64}$/.test(randomToken) ||
    !/^[a-f0-9]{64}$/.test(signature)
  ) {
    return false;
  }

  const expectedSignature = createSignature(
    randomToken,
    authToken
  );

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
};

const csrfProtection = (req, res, next) => {
  try {
    const authToken = req.cookies?.porChatal;
    const cookieToken = req.cookies?.csrfToken;
    const headerToken = req.get("X-CSRF-Token");

    if (
      !authToken ||
      !cookieToken ||
      !headerToken ||
      cookieToken !== headerToken ||
      !verifyCsrfToken(cookieToken, authToken)
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid CSRF token"
      });
    }

    return next();

  } catch (error) {
    console.error("CSRF verification error:", error.message);

    return res.status(403).json({
      success: false,
      message: "CSRF verification failed"
    });
  }
};

module.exports = {
  generateCsrfToken,
  csrfProtection
};