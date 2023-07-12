const router= require("express").Router()
const admin= require("firebase-admin")

router.get("/",(req,res)=>{
    return res.send("Inside the user router")
})


router.get("/jwtVerification", async (req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).send({ msg:"token not found" })
    }

    const token=req.headers.authorization.split(" ")[1]
    try {
        const decodedValue=await admin.auth().verifyIdToken(token)
        if(!decodedValue){
            return res.status(500).json({success:false,msg:"unauthorized access"})
        }

        return res.status(200).json({success:true, data: decodedValue})


    } catch (error) {
        return res.send({ success : false, msg:"error in extracting the token ${error}"})
    }

})

module.exports=router