const express = require('express');
const router = express.Router();
const Authentication=require('../middleware/Authentication.js')
const Address=require('../Schema/AdressSchema.js')



router.post('/setAddress', Authentication, async (req, res) => {
    try {
      const userId = req.user.user.id;
      const { name, mobileNo, area, city } = req.body;
  
      // Check if an address already exists for the user
      let existingAddress = await Address.findOne({ userId });
  
      if (existingAddress) {
        // If an address exists, update it
        existingAddress.name = name;
        existingAddress.mobileNo = mobileNo;
        existingAddress.area = area;
        existingAddress.city = city;
        await existingAddress.save();
        res.json({
          message: "Address updated successfully",
          status: 200,
          address: existingAddress
        });
      } else {
        // If no address exists, create a new one
        const newAddress = await Address.create({
          userId,
          name,
          mobileNo,
          area,
          city
        });
        res.json({
          message: "Address created successfully",
          status: 200,
          address: newAddress
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Internal server error"
      });
    }
  });
 




//getting data from food category 
router.get('/getAddresses', Authentication, async (req, res) => {
    try {
      const userId = req.user.user.id;
  
      // Use the userId to find addresses associated with that user
      const addresses = await Address.find({ userId });
  
      if (addresses) {
        res.send(addresses)
      } else {
        res.status(404).json({
          status: 404,
          message: "No addresses found for this user"
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Internal server error"
      });
    }
  });
  
  



module.exports = router;