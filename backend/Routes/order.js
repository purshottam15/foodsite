const express = require('express');
const router = express.Router();
const Authentication=require('../middleware/Authentication.js')
const FoodOrder=require('../Schema/foodOrderSchema.js')
const AdminAuth=require('../middleware/AdminAuth.js')




router.post('/giveorder',Authentication,async(req,res)=>{
    let {food,modeofpayment,address}=req.body;
    let userId=req.user.user.id;

    let order=await FoodOrder.create({
        userId,foodItem:food,modeofpayment,address:address
    })
    if(order){
        res.json({
            message:"Order has been placed",status:200
        })
    }
    else{
        res.json({
            message:"Some error",status:401
        })
    }




})
router.get('/userOrder',Authentication,async(req,res)=>{
    let userId=req.user.user.id;

    let order=await FoodOrder.find({userId});
    if(!order){
        res.json({
            status:401,message:"Some error"
        })
        return;
    }
    res.json(order)

    
    })


    router.put('/updateOrderStatus/:orderId', AdminAuth, async (req, res) => {
        try {
          const { orderId } = req.params;
          const { newStatus } = req.body;
      
          // Check if the order with the given orderId exists
          const order = await FoodOrder.findById(orderId);
      
          if (!order) {
            return res.status(404).json({ message: 'Order not found', status: 404 });
          }
      
          // Update the order status
          order.status = newStatus;
          
          // Save the updated order
          const updatedOrder = await order.save();
      
          res.json({ message: 'Order status updated successfully', status: 200, updatedOrder });
        } catch (error) {
          console.error('Error updating order status:', error);
          res.status(500).json({ message: 'Internal server error', status: 500 });
        }
      });



      router.get('/allUserOrders', AdminAuth, async (req, res) => {
        try {
          // Fetch all food orders
          const allOrders = await FoodOrder.find();
      
          res.json(allOrders);
        } catch (error) {
          console.error('Error fetching all user orders:', error);
          res.status(500).json({ message: 'Internal server error', status: 500 });
        }
      });








  module.exports=router;
      









// module.exports = router;