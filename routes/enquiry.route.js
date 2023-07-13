const express = require("express");

const {
  createEnquiry,
  claimEnquiry,
  getClaimedEnquiries,
  getUnclaimedEnquiries,
} = require("../controllers/enquiry.controller");
const { authentication } = require("../middleware/authentication");

const EnquiryRouter = express.Router();

EnquiryRouter.post("/create", createEnquiry);
EnquiryRouter.patch("/claim/:enquiryID", authentication, claimEnquiry);
EnquiryRouter.get("/claimed", authentication, getClaimedEnquiries);
EnquiryRouter.get("/unclaimed", authentication, getUnclaimedEnquiries);

module.exports = {
  EnquiryRouter,
};
