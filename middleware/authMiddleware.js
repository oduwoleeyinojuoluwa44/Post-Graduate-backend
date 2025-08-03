const verifyCode = (req, res, next) => {
  const code = req.header('x-verification-code') || req.body.code;
  if (!code || code !== process.env.VERIFICATION_CODE) {
    return res.status(401).json({ msg: 'Invalid or missing verification code.' });
  }
  next();
};

module.exports = { verifyCode };
