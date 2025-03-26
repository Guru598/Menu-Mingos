import React from 'react'
import AddtoCart from './AddtoCart';

const MenuCard = ({menuData}) => {
    //    console.log(menuData);
  return (
   <>
   <section className='main-card--cointainer'>
   {menuData.map((curElem) => {
    const{item_id,image_url,item_name,category,price,description} = curElem;
    return(
        <>
       <div className='card-container' key={item_id}>
  <div className='card'>
    <div className='card-body'>
      <span className='card-number card-circle subtle'>{item_id}</span>
      <span className='card-author'>{category}</span>
      <h2 className='card-title'>{item_name}</h2>
      <span className='card-description subtle'>
        {description}
      </span>
      
     
      <img src={image_url} alt={item_name} className='card-media' />
      <div className='card-price subtle'>Price:{price}</div> 
      <span className='card-tag subtle'><AddtoCart curElem={curElem}/></span>
    </div>
  </div>
</div>

       
       </>
    )
   })}
  </section>
   </>
  )
}

export default MenuCard