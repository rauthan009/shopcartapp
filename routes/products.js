const express=require("express");
const route=express.Router();

const{
    products,vendors
}=require("../db")
route.get('/products',async (req,res)=>{
    const result= await products.findAll({include:[vendors]})
    res.send(result)
    
})
route.post('/products',async (req,res)=>{
    try {
        const result=await products.findOrCreate({
            where:
            {
            name:  req.body.name.toString(),
            price: req.body.price,
            qty: req.body.qty,
            vendorId:req.body.vendorId
            }
        }).then((item)=>{
            res.send({success: true})
        })
        
    } catch (error) {
        res.send({success: false, message:error})
    }
})
route.post('/products/delete',async (req,res)=>{
    try{
        const result=await products.destroy({
            where:{
                id: req.body.id
            },
            
        })
        res.send({success: true})
    }catch(error){
        res.send({success:false,message: error})
    }
})
console.log("products.js working");
module.exports=route;