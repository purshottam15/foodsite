import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react'
import '../App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="swipe">

    
<Swiper
  spaceBetween={50}
  slidesPerView={1}
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper) => console.log(swiper)}
>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2015/07/12/14/26/coffee-842020_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863_1280.jpg" className='Swipephoto' alt="" /></SwiperSlide>

 
  ...
</Swiper>
</div>
<div className='desc'>

<h5 className=''>
    
A Foodie website is a delectable online destination where culinary enthusiasts and foodies alike can explore a mouthwatering array of recipes, cooking tips, and gastronomic delights. It serves as a digital cookbook, offering an extensive collection of dishes spanning various cuisines, dietary preferences, and skill levels. Visitors can embark on a culinary journey, discovering new flavors, meal ideas, and cooking techniques. The website may include visually enticing images of dishes, step-by-step cooking instructions, ingredient lists, and nutrition facts. Additionally, it might feature articles on food trends, restaurant reviews, and nutrition advice, making it a one-stop hub for all things food-related, catering to the cravings and curiosities of food lovers worldwide.






</h5>
</div>
<div className='explore'>
        <h1 style={{textAlign:'center'}}>Explore the Delicious</h1>

        <div className="foodExplore">
          <div className="foodcard">
            <img src="https://cdn.pixabay.com/photo/2021/07/02/05/09/paneer-tikka-6380891_1280.jpg" alt="" />
            <h4>Starter</h4>
            <p>Delight your taste buds with a tantalizing selection of Indian starters. These appetizers are a culinary journey in themselves, offering a symphony of tastes and textures.</p>
            <button type="button" class="btn btn-dark"><Link className="btn btn-dark" to="/food">Explore</Link></button>
          </div>
          <div className="foodcard">
            <img src="https://cdn.pixabay.com/photo/2012/07/09/07/16/thali-51996_1280.jpg" alt="" />
            <h4>Main course</h4>
            <p>Embark on a culinary journey through India's diverse and flavorful main courses, where each dish tells a tale of rich tradition and gastronomic innovation.</p>
            <button type="button" class="btn btn-dark"><Link className="btn btn-dark" to="/food">Explore</Link></button>
          </div>
          <div className="foodcard">
            <img src="https://cdn.pixabay.com/photo/2014/12/22/12/33/sweets-577230_1280.jpg" alt="" />
            <h4>Desert</h4>
            <p>Embark on a journey of sweet extravagance with these delectable Indian desserts. Each treat carries the essence of tradition and a burst of irresistible flavors.</p>
            <button type="button" class="btn btn-dark"><Link className="btn btn-dark" to="/food">Explore</Link></button>
          </div>
        </div>
    </div>

        </div>
    </div>
  )
}
