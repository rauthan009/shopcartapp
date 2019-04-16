const express=require("express");
const route=express.Router();
const Sequelize=require("sequelize");
const{cartItems,products,vendors}=require("../db")
route.post('/cart/add',async (req,res)=>{
    try{
    cartItems.findOrCreate({
        where:{
            userId:req.body.userId,
            productId:req.body.productId
        },
        defaults:{
            qty: 0
        }
    }).then((items)=>{
            console.log("sdsadsadsad")
            
            items[0].increment(
                {
                    qty: 1
                },
                {
                    where:{
                        userId:req.body.userId,
                       productId:req.body.productId
                    }
                })
        
        res.send({success: true});
    })
    
}
catch(error){
    res.send({success: false,message: error});
}
})
route.post('/cart',(req,res)=>{
    try{
        cartItems.findAll({
            where:{
                userId: req.body.userId
            },
            include:
                [
                    {
                        model: products,
                        include:[vendors]
                    }
                ]
            }).then((item)=>{
            res.send(item);
        })    
            
    }
    catch(error){
        res.send({success: false,message: error});
    }
})
route.post('/cart/delete',async(req,res)=>{
    try{
        const result=await cartItems.destroy({
            where:{
                id: req.body.id
            },
            
        })
        res.send({success: true})
    }catch(error){
        res.send({success:false,message: error})
    }
})
console.log("cart.js working");
module.exports=route