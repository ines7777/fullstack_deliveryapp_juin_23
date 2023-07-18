import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import "swiper/css"
import "../assets/css/swiperStyles.css"
import "swiper/css/bundle"
import { useSelector } from 'react-redux'

const Slider = () => {
    const products=useSelector((state)=>state.products)
    const [fruits,setFruits]=useState(null)

    useEffect(()=>{
        setFruits(products?.filter((data)=> data.product_Category==="fruits"))
        console.log(fruits)
    }, [products])
  return (
    <div className='w-full pt-24'>
         <Swiper slidesPerView={4} centeredSlides={false} 
         spaceBetween={30} grabCursor={true} 
 className="mySwiper">
  
  {fruits && fruits.map((data,i)=> (
    <SwiperSlide key={i}>slide1</SwiperSlide>
  ))}
       
  </Swiper>
      
    </div>
  )
}

export default Slider