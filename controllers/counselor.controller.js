const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { CounselorModel } = require("../models/counselor.model");

// Counselor registration
const counselorRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const counselorExist = await CounselorModel.findOne({ email });

    // Check if counselor is already registered
    if (counselorExist) {
      return res.status(409).send({ message: "Counselor Already Exist" });
    }

    // Hashing the password
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) {
        console.error("Error while hashing the password: ", error);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      try {
        const newCounselor = new CounselorModel({
          name,
          email,
          password: hashedPassword,
        });

        await newCounselor.save();

        res.status(201).send({ message: "Counselor Registered successfully" });
      } catch (error) {
        console.error("Error while saving counselor: ", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error during counselor registration: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Counselor login
const counselorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const counselor = await CounselorModel.findOne({ email });

    // Check if counselor is present in DB
    if (!counselor) {
      return res.status(404).send({ message: "Counselor not found" });
    }

    const matchedPassword = await bcrypt.compare(password, counselor.password);

    if (matchedPassword) {
      const token = jwt.sign(
        { email: counselor.email },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      res
        .status(200)
        .send({ message: "Counselor logged in successfully", token });
    } else {
      res.status(401).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error("Error during counselor login", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  counselorRegister,
  counselorLogin,
};
