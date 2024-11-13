
import { Helmet } from 'react-helmet-async';

import Banner from '../Banner/Banner';
import AboutUs from '../About/About';
import OurServices from '../OurServices/OurServices';
import FAQ from '../FAQ/FAQ';



const Home = () => {
    return (
        <div>
            <Helmet><title>Bistro | Home</title></Helmet>
            <Banner/>
            <OurServices/>
            <AboutUs/>
            <FAQ/>
        
            
        </div>
    );
};

export default Home;