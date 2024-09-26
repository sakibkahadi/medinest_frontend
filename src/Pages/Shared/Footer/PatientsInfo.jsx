import React from 'react';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css';
const PatientsInfo = () => {
    return (
        <div className='space-y-5'>
            <h1 className='text-xl font-bold'>For Patients</h1>
            <div className=' flex flex-col space-y-3'>
                <Link>FAQ's</Link>
                <Link>Find Doctors</Link>
                <Link>Find Ambulances</Link>
                <Link>Privacy & Policy</Link>
                <Link>Terms & Conditions</Link>
            </div>
        </div>
    );
};

export default PatientsInfo;