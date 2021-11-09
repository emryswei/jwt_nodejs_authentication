const router = require("express").Router();
const User = require("../model/User");

// validation using joi
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
});

router.post("/Register", async (req, res) => {
  // validate the input information
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(error);
  }
});

module.exports = router;
