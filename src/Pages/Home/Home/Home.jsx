
import { Helmet } from 'react-helmet-async';
import Ambulances from '../Ambulance/Ambulances';
import Appointment from '../Appointment/Appointment';


const Home = () => {
    return (
        <div>
            <Helmet><title>Bistro | Home</title></Helmet>
            <Ambulances></Ambulances>
            <Appointment/>
        </div>
    );
};

export default Home;