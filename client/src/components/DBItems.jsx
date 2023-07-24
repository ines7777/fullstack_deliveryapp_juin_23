import React from 'react'
import {DataTable} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAProduct, getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'
import { alertNULL, alertSuccess } from '../context/actions/alertActions'
 

const DBItems = () => {
  
  const products= useSelector((state) => state.products)
  const dispatch=useDispatch()
  console.log("prod", products)

  return (
    <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
      <DataTable columns={[
        {title: "Image", field: "imageURL", render : (rowData) =>(
          <img src={rowData.imageURL} alt="" className='w-32 h-16 object-contain rounded-md' />
        )
      },
      {title :"Name", field: "product_name"},
      {title : "Category", field:"product_Category"},
      {title : "Price", field:"product_price", render:(rowData)=>(
        <p className='text-2xl font-semibold text-textColor flex items-center 
        justify-center '>
          <span className='text-red-400'>$</span>{" "}
          {parseFloat(rowData.product_price).toFixed(2)}
        </p>
      )}
      ]}
      data = {products} 
      title = "List of products" 
      actions={[
        {
          icon: "edit",
          tooltip: "Edit Data",
          onClick : (event, rowData)=>{
          alert("You want to edit" + rowData.productId)
        }
      },
      {
        icon: "delete",
        tooltip: "Delete Data",
        onClick : (event, rowData)=>{
        
        if (window.confirm("Are you sure you want to perform this action")){
          deleteAProduct(rowData.productId).then(res=>{
            dispatch(alertSuccess("Product deleted"));
            setInterval(() => {
              dispatch(alertNULL())
            }, 3000);
            getAllProducts().then(data=>{
              dispatch(setAllProducts(data))
            })
          })

        }

    
        
      }
    }
      ]} />
    </div>
  )
}

export default DBItems
