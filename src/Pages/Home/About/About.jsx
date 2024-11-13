import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
<div>
    
<div className="px-2">

    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="space-y-5 ">
            <h1 className=" text-2xl md:text-4xl  font-semibold text-[#0D2E4E]">About MediNest</h1>
            <h2 className="text-xl md:text-2xl  lg:mt-5 mt-3 font-semibold text-[#0D2E4E]">Who we are</h2>
            <p className="  lg:text-xl text-sm  text-gray-600">
            MediNest is an online platform connecting patients with doctors, clinics, and healthcare services. From doctor appointments to ambulance services and medicine purchases, we make healthcare easily accessible, right at your fingertips.
            </p>
            <h2 className="text-xl md:text-2xl  lg:mt-8 mt-3 font-semibold text-[#0D2E4E]">Our Mission</h2>
            <p className=" lg:text-xl text-sm  text-gray-600">
            Our mission is to offer a seamless healthcare experience by linking users with trusted medical professionals. Run by healthcare experts, MediNest is committed to enhancing healthcare access across Bangladesh.
            </p>
            <h2 className="text-xl md:text-2xl  lg:mt-8 mt-3 font-semibold text-[#0D2E4E]">Our Vision</h2>
            <p className=" lg:text-xl text-sm  text-gray-600">
            MediNest aspires to be the nation's leading healthcare platform, providing an all-in-one solution for finding doctors, clinics, and services. Our goal is to make healthcare more accessible and personalized for all.
            </p>
            
            
        </div>
        <div className="mt-5">
            <img src="https://i.ibb.co.com/689n5j2/about0.jpg" alt="Healthcare Image 1" className=" h-full  rounded-lg shadow-lg" />
        </div>
    </div>


    <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-5">

       
        <div className="space-y-5 md:order-2">
            <h1 className="text-2xl md:text-4xl font-semibold text-[#0D2E4E]">Healing starts here</h1>
            <h2 className="text-xl md:text-2xl lg:mt-8 mt-3 font-semibold text-[#0D2E4E]">The right answers the first time</h2>
            <p className=" lg:text-xl text-sm text-gray-600">
            Finding the right care shouldn't be difficult. With MediNest, you can quickly find the healthcare services you need at the touch of a button. We ensure that every medical case, from routine check-ups to complex conditions, is handled with expertise and care.
            </p>
            <h2 className="text-xl md:text-2xl lg:mt-8  font-semibold text-[#0D2E4E]">Top-ranked in the Bangladesh</h2>
            <p className="mt-2 lg:text-xl text-sm text-gray-600">
             MediNest connects patients to top healthcare providers across Bangladesh. Our growing network ensures quality healthcare is available to everyone, wherever they are.
            </p>
            <h2 className="text-xl md:text-2xl lg:mt-8 mt-2 font-semibold text-[#0D2E4E]">Personalized Healthcare for All</h2>
            <p className="mt-2 lg:text-xl text-sm text-gray-600">
            MediNest tailors healthcare to each patient's unique needs. With personalized care plans and services, we ensure every patient receives the best treatment for their health concerns.
            </p>
           
        </div>
        <div className=" md:order-1 ">
            <img src="https://i.ibb.co.com/svMn5zH/about3.jpg" alt="Healthcare Image 2" className=" h-full rounded-lg shadow-lg" />
        </div>
    </div>



    

        </div>
</div>
    );
};

export default AboutUs;