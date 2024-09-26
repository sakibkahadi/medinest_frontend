import React from 'react';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css';
const Organization = () => {
    return (
        <div className='space-y-5'>
            <h1 className='text-xl font-bold'>For Doctors/Organisations</h1>
            <div className=' flex flex-col space-y-3'>
                <Link>Login as Doctor</Link>
                <Link>Work with us</Link>
                <Link>Privacy & Policy</Link>
                <Link>Terms & Conditions</Link>
            </div>
        </div>
    );
};

export default Organization;