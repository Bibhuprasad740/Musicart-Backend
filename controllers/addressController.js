const Address = require("../database/models/Address");

exports.getAddresses = async (req, res) => {
  console.log("Address fetch req...");
  try {
    const userId = req.userId;
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(400).send("No address found!");
    }
    res.status(200).send(addresses);
  } catch (error) {
    console.log("Error in addressController.getAddresses", error);
    res.status(400).send("Can not get Addresses");
  }
};
