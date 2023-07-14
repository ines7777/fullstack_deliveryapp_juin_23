const router= require("express").Router();
const admin= require("firebase-admin");
const db=admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

router.post("/create", async(req,res)=>{
    try {
        const id=Date.now();
        const data={
            productId: id,
            product_name: req.body.product_name,
            product_Category: req.body.product_Category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL
          }
          const response= await db.collection("products").doc(`/${id}/`).set(data);
          console.log(response);
          return res.status(200).send({ success: true, data: response });
    } catch (error) {
        return res.send({ success: false, msg: `Error :${error}` });
    }
})

//get all the products
router.get("/all", async(req,res)=>{
    (async () => {
        try {
            let query= db.collection("products");
            let response=[];
            await query.get().then(querysnap=>{
                let docs= querysnap.docs;
                docs.map(doc => {
                    response.push({...doc.data()})
                })
                return response;
            })
            return res.status(200).send({ success: true, data: response });
        } catch (error) {
            return res.send({ success: false, msg: `Error :${error}` });
        }


    })();
});

module.exports=router;