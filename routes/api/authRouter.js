const express = require("express");
const router = new express.Router();

const {
  loginControler,
  registrationControler,
} = require("../../controlers/contactsControler");

router.post("/register", async () => {
  await registrationControler();
});
router.post("/login", async () => {
    await loginControler();
});
