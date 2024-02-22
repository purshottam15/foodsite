import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'
import '../App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

// Import Swiper styles
import 'swiper/css';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate=useNavigate()
useEffect(()=>{
  if(!localStorage.getItem('token')){
    
    navigate('/login')
   
      }

},[])
  
  return (
    <div>
        <div className=" container-sm">
        <div className="swipe ">
  
<Swiper
  spaceBetween={50}
  slidesPerView={1}
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper) => console.log(swiper)}
>
  <SwiperSlide><img  src="https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_1280.jpg" className='Swipephoto rounded-md' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg" className='Swipephoto rounded-md' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>

 
  ...
</Swiper>
</div>
<div className='explore'>
        <h1 className='text-2xl tracking-normal' style={{textAlign:'center'}}>Explore the Delicious</h1>

        <div className="foodExplore">
         <div className='flex gap-2 mx-auto lg:flex-nowrap sm:flex-wrap md:flex-wrap'>
    
         <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
    <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHN8ZW58MHx8MHx8fDA%3D" alt="profile-picture" />
  </div>
  <div class="p-6 text-center">
    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Biryani 😋
    </h4>
    <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 my-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy Now</button>
  </div>
</div>
<div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
    <img src="https://i0.wp.com/travelgenes.com/wp-content/uploads/2020/10/1018267651.jpg?fit=780%2C902&ssl=1" alt="profile-picture" />
  </div>
  <div class="p-6 text-center">
    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
   Bahubali Thali 😋
    </h4>
    <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 my-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy Now</button>
  </div>
</div>
<div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
    <img className='object-fill' src="https://eastindianrecipes.net/wp-content/uploads/2022/09/How-to-Make-North-Indian-Thali-Vegetarian-6.jpg" />
  </div>
  <div class="p-6 text-center">
    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Special Thali 😋
    </h4>
    <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 my-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Buy Now</button>
  </div>
</div>

         </div>
        </div>
    </div>

        </div>
    </div>
  )
}
