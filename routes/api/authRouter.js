const express = require("express");
const router = new express.Router();
const Joi = require("joi");

const schemaRegistration = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});



const {
  loginController,
  registrationController,
} = require("../../controlers/authControler");

router.post("/register", async (req, res) => {
  const validatedBody = schemaRegistration.validate(req.body);
  const { error } = validatedBody;
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const registrationFunc = await registrationController(req, res);

  if (!registrationFunc) {
    return res.status(409).json({ message: "Email in use" });
  }

  return res.status(201).json({
    user: {
      email: req.body.email,
      subscription: req.body.subscription,
    },
  });
});


router.get("/login", async (req, res) => {
  const validatedBody = schemaLogin.validate(req.body);
  const { error } = validatedBody;
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  const loginFunc = await loginController(req, res);

  if (!loginFunc) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  return res.status(200).json({
    token: loginFunc,
    user: {
      email: req.body.email,
      subscription: req.body.subscription,
    },
  });
});

module.exports = router;
