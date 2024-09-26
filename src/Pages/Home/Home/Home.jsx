
import { Helmet } from 'react-helmet-async';
import Ambulances from '../Ambulance/Ambulances';


const Home = () => {
    return (
        <div>
            <Helmet><title>Bistro | Home</title></Helmet>
            <Ambulances></Ambulances>
        </div>
    );
};

export default Home;