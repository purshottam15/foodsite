import React, { useEffect, useState } from 'react';
import FoodCart from './FoodCart';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigate, useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Alert from './Alert';

export default function Food(props) {
  const navigate=useNavigate()
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3); // Default value
  const [IsError, setIsError] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")
  const [alert, SetAlert] = useState(false)
  const [message, setMessage] = useState("")


  const makeAlert=()=>{
    setMessage("Item added to cart")
    SetAlert(true)
    setTimeout(()=>{
      SetAlert(false)

    },1000)
  }

  const fetchFood = async () => {
    let res = await fetch('http://localhost:5000/auth/food', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

     let data = await res.json();
     if(data.status==500){
      setIsError(true);
      seterrorMessage("Internal server problem ...Try again")
     }
   setCategories(data[1]); // Assuming data[0] contains categories
    setItems(data[0]); // Assuming data[1] contains food items
  };

  useEffect(() => {
    if(!localStorage.getItem('token')){
    
      navigate('/login')
     
        }
    fetchFood();
    
    // Update slidesPerView when the window is resized
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 600 ? 1 : 3);
    };

     handleResize();

    return () => {
      // Remove the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
     { alert&&<Alert message={message}/>}
      <div className="mb-2 my-3 container ">
      {IsError && <h2 style={{ color: "red",textAlign:"center" }}>{errorMessage}</h2>}
        <input
          type="email"
          className="border-3 form-control"
          id="exampleFormControlInput1"
          placeholder="I am Craving-----Search your favorite food"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="container mainFood">
        {categories.map((category) => (
          <div key={category._id}>
            <h3>{category.category}</h3>
            <hr />
            <div className="foodContainer">
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={slidesPerView}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
              >
                {items
                  .filter(
                    (item) =>
                      item.category === category.category &&
                      item.foodName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <SwiperSlide key={item._id}>
                      <FoodCart
                        key={item._id}
                        name={item.foodName}
                        price={item.price}
                        image={item.image}
                        makeAlert={makeAlert}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
