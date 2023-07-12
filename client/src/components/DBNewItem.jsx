import React, { useState } from 'react'
import { statuses } from '../utils/styles'
import {Spinner} from "../components"

const DBNewItem = () => {
 
  const [itemName,setItemName] = useState("")
  const[price,setPrice]=useState("")
  const[category,setCategory] = useState(null)
  const[isLoading,setIsLoading]=useState(true)

  return (
    <div className='flex items-center justify-center flex-col pt-6 px-24 w-full'>
      <div className='border border-gray-300 rounded-md p-4 w-full flex 
      flex-col items-center justify-center gap-4'>
        
         <InputValueField type="text" placeHolder={"item name here"} 
         stateFunc={setItemName} stateValue={itemName}/>

<div className='w-full flex items-center justify-around gap-3 flex-wrap'>
            
            {statuses && statuses?.map(data=>(
              <p key={data.id} 
              onClick={()=>setCategory(data.category)}
              className={`px-4 py-3 rounded-md text-xl 
              font-semibold cursor-pointer hover:shadow-md border border-gray-200
              backdrop-blur-md ${data.category=== category ? "bg-red-400 text-primary" 
              : "bg-transparent"} `}>{data.title}</p>
            ))}

      </div>

      <InputValueField type="number" placeHolder={"Item price here"} 
         stateFunc={setPrice} stateValue={price}/>

         <div className='w-full bg-card backdrop-blur-md h-300 rounded-md 
         border-2 border-dotted border-gray-300 cursor-pointer'>

              {isLoading ? (
              <div className='w-full h-full flex flex-col items-center
              justify-evenly px-24'>
                <Spinner/>
              </div>)  : (
                <></>
              ) }  


         </div>


      </div>

      

    </div>
  )
}

export const InputValueField=({type,placeHolder,stateValue,stateFunc})=>{
  return(
     <>
       <input type={type} placeholder={placeHolder} 
       className='w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md
       border border-gray-200 focus:border-red-400'
       value={stateValue} onChange={(e)=> stateFunc(e.target.value)} />
     </>
  )
}

export default DBNewItem
