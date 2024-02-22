const express = require('express');
const router = express.Router();
const Authentication=require('../middleware/Authentication.js')
const FoodCart=require('../Schema/FoodCart.js')




router.post('/setfoodcart', Authentication, async (req, res) => {
  try {
    const { foodName, price, quantity } = req.body;
    const userId = req.user.user.id;

    // Check if the item is already in the cart for the user
    let existingCartItem = await FoodCart.findOne({ userId, foodName });

    if (existingCartItem) {
      // If the item is already in the cart, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.json({
        message: "Quantity updated in the cart",
        status: 200,
        updatedCartItem: existingCartItem
      });
    } else {
      // If the item is not in the cart, create a new cart item
      let foodcart = await FoodCart.create({
        userId,
        foodName,
        price,
        quantity
      });

      if (foodcart) {
        res.json({
          message: "Food added to cart",
          status: 200
        });
      } else {
        res.json({
          message: "Some error occurred"
        });
      }
    }
  } catch (error) {
    console.error("Error in /setfoodcart:", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

router.get('/foodcart',Authentication,async(req,res)=>{
    let userId=req.user.user.id;

    let userCart=await FoodCart.find({userId});
    if(userCart){
        res.send(
            
            userCart
        )
    }
    else{
        res.json({
            status:404,
            message:"Nothing in cart"
        })
    }

 
    })




    router.put('/updatefoodcart/:itemId', Authentication, async (req, res) => {
        try {
          const itemId = req.params.itemId; // Extract item ID from the URL
          const {quantity } = req.body;
      
          // Find the cart item by ID and user ID
          const userId = req.user.user.id;
          const updatedItem = await FoodCart.findOneAndUpdate(
            { _id: itemId, userId },
            { quantity:quantity },
            { new: true }
          );
      
          if (updatedItem) {
            res.json({
              status: 200,
              message: "Cart item updated successfully",
              updatedItem
            });
          } else {
            res.status(404).json({
              status: 404,
              message: "Cart item not found"
            });
          }
        } catch (error) {
          console.error("Error in /updatefoodcart:", error);
          res.status(500).json({
            status: 500,
            message: "Internal Server Error"
          });
        }
      });




//  endpoint to delete 
router.delete('/deletefoodcart/:itemId', Authentication, async (req, res) => {
    try {
      const itemId = req.params.itemId; // Extract item ID from the URL
  
      // Find and delete the cart item by ID and user ID
      const userId = req.user.user.id;
      const deletedItem = await FoodCart.findOneAndDelete({ _id: itemId, userId });
  
      if (deletedItem) {
        res.json({
          status: 200,
          message: "Cart item deleted successfully",
          deletedItem
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Cart item not found"
        });
      }
    } catch (error) {
      console.error("Error in /deletefoodcart:", error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error"
      });
    }
  });


  router.delete('/clearfoodcart', Authentication, async (req, res) => {
    try {
      // Get the user ID from the authenticated user
      const userId = req.user.user.id;
  
      // Delete all items in the cart associated with the user ID
      const deletedItems = await FoodCart.deleteMany({ userId });
  
      if (deletedItems.deletedCount > 0) {
        res.json({
          status: 200,
          message: "Cart cleared successfully",
          deletedItems
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "No items found in the cart to clear"
        });
      }
    } catch (error) {
      console.error("Error in /clearfoodcart:", error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error"
      });
    }
  });
  
      









module.exports = router;