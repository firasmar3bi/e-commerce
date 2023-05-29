
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function Card() {
  let [gategory ,setGategory] = useState([]);
  let getCategory = async ()=>{
    let {data} = await axios.get('https://precious-bass-tights.cyclic.app/category');
    setGategory(data.category);
  }
  useEffect (
    ()=>{
      getCategory()
    },[]
  )
  return (
    <>
      <div className='row'> 
        
        {
          gategory.map((ele,index)=>{
            return( <div className='col-md-4' key={index} >
              <h2>{ele.name}</h2>
              <div className='w-100'>
              <img src={ele.image.secure_url} alt="" className='w-75'/>
              </div>
            </div>)
          })
        }
      
    </div> 
    </>
  )
}
