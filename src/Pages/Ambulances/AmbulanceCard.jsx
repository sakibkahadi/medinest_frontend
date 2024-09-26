/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { RiCheckDoubleFill } from 'react-icons/ri';
import ServicesFooter from '../../components/AmbulanceComponents/ServicesFooter';

import 'daisyui/dist/full.css';
const AmbulanceCard = ({ambulance}) => {
    const {_id, title, description, image1,image2, smallDetails} = ambulance
    return (
        <div className='space-y-6 mt6'>
            <h1 className= ' rounded-md text-xl text-black  text-center font-semibold pl-5 py-2'>{title}</h1>
           <div className='grid grid-cols-2 gap-6'>
            <img className='h-64 w-full' src={image1} alt="" />
            <img className='h-64 w-full' src={image2} alt="" />
           </div>
           <p className='text-lg'>{description}</p>

           <div className='flex flex-col space-y-5'>
            <ServicesFooter smallDetails={smallDetails.smallDetails1}/>
            <ServicesFooter smallDetails={smallDetails.smallDetails2}/>
            <ServicesFooter smallDetails={smallDetails.smallDetails3}/>
           
           </div>
        </div>
    );
};

export default AmbulanceCard;