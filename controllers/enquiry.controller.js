const { EnquiryModel } = require("../models/enquiry.model");

// Creating new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterested } = req.body;

    // Creating a new enquiry
    const newEnquiry = new EnquiryModel({ name, email, courseInterested });
    await newEnquiry.save();

    res.status(201).send({ message: "New enquiry created successfully" });
  } catch (error) {
    console.error("Error while creating new enquiry: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Claiming Enquiry
const claimEnquiry = async (req, res) => {
  try {
    const { enquiryID } = req.params;
    const enquiry = await EnquiryModel.findById(enquiryID);

    // Check if the enquiry exists
    if (!enquiry) {
      return res.status(404).send({ message: "Enquiry not found" });
    }

    // Check if the enquiry is already claimed
    if (enquiry.claimedBy) {
      return res.status(409).send({ message: "Enquiry is already claimed" });
    }

    // Set the claimedBy field to the user's id
    enquiry.claimedBy = req.user.id;
    await enquiry.save();
    res.status(200).send({ message: "Enquiry claimed successfully" });
  } catch (error) {
    console.error("Error while claiming the enquiry:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Get claimed enquiries
const getClaimedEnquiries = async (req, res) => {
  try {
    // Find enquiries claimed by the user
    const claimedEnquiries = await EnquiryModel.find({
      claimedBy: req.user.id,
    });

    if (claimedEnquiries.length === 0) {
      return res.status(200).json({ message: "No data found" });
    }

    res.status(200).json(claimedEnquiries);
  } catch (error) {
    console.error("Error while retrieving claimed enquiries:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Get unclaimed enquiries
const getUnclaimedEnquiries = async (req, res) => {
  try {
    // Find all unclaimed enquiries
    const unclaimedEnquiries = await EnquiryModel.find({ claimedBy: null });

    if (unclaimedEnquiries.length === 0) {
      return res.status(200).json({ message: "No data found" });
    }

    // Return all unclaimed enquiries
    res.status(200).json(unclaimedEnquiries);
  } catch (error) {
    console.error("Error while retrieving unclaimed enquiries:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  createEnquiry,
  claimEnquiry,
  getClaimedEnquiries,
  getUnclaimedEnquiries,
};
