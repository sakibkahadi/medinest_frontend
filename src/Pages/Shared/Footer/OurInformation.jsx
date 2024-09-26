import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../../../assets/logo/logo.png'
import 'daisyui/dist/full.css';
const OurInformation = () => {
    return (
        <div className=' space-y-5'>
            <img className='h-10 ' src={logo} alt="" />
            <p className=' '>
            We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
            </p>
            <div className='flex gap-5  items-center  '>
                <a href="www.facebook.com"><FaFacebook className=' h-7 w-10' /></a>
                <a href="www.facebook.com"><FaYoutube className=' h-7 w-10' /></a>
                <a href="www.facebook.com"><FaTwitter className=' h-7 w-10' /></a>
                <a href="www.facebook.com"><FaInstagram className=' h-7 w-10' /></a>
            </div>
        </div>
    );
};

export default OurInformation;