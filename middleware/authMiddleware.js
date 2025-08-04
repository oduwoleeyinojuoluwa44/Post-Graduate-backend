const verifyCode = (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return res.status(401).json({ msg: 'Verification code is required.' });
  }
  if (code !== '123456') {
    return res.status(401).json({ msg: 'Invalid verification code.' });
  }
  next();
};

module.exports = { verifyCode };
