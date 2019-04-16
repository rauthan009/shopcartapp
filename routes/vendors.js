const express=require("express");
const route=express.Router();

const{
    vendors,products
}=require("../db")
route.get('/vendors',async (req,res)=>{
    const result= await vendors.findAll()
    res.send(result)
    
})
route.post('/vendors',async (req,res)=>{
    try {
        const result=await vendors.findOrCreate({
            where:
            {
            name:  req.body.name.toString()
            }
        }).then((item)=>{
            res.send({success: true})
        })
    } catch (error) {
        res.send({success: false, message:error})
    }
})
route.post('/vendors/delete',async (req,res)=>{
    try{
        const result=await vendors.destroy({
            where:{
                id: req.body.id
            },
        })
        const result1=await products.destroy({
            where:{
                vendorId: null
            }
        })
        res.send({success: true})
    }catch(error){
        res.send({success:false,message: error})
    }
})
console.log("vendors.js working");
module.exports=route;