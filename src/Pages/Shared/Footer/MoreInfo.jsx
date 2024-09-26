import React from 'react';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css';
const MoreInfo = () => {
    return (
        <div className='space-y-5'>
            <h1 className='text-xl font-bold'>MedNes.t</h1>
            <div className=' flex flex-col space-y-3'>
                <Link>About Us</Link>
                <Link>contact</Link>
                <Link>Privacy Policy</Link>
                <Link>Terms & Conditions</Link>
            </div>
        </div>
    );
};

export default MoreInfo;