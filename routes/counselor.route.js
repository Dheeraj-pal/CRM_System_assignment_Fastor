const express = require("express");

const {
  counselorRegister,
  counselorLogin,
} = require("../controllers/counselor.controller");

const CounselorRouter = express.Router();

CounselorRouter.post("/register", counselorRegister);
CounselorRouter.post("/login", counselorLogin);

module.exports = {
  CounselorRouter,
};
