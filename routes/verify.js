const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("", (req, res) => {
  console.log("In verify");
  const token = req.header("auth-token");
  if (!token) return res.send({ isAuth: false });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified);
    res.send({ isAuth: true, userID: verified.id });
  } catch (err) {
    res.send({ isAuth: false });
  }
});

module.exports = router;
