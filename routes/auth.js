const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation");

router.post("/Register", async (req, res) => {
  // validate the input information
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email is already exists
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) return res.status(400).send("Email already existed.");

  // hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    password: hashPassword,
    email: req.body.email,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser.name });
  } catch (err) {
    res.status(400).send(error);
  }
});

module.exports = router;
