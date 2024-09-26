import { RiCheckDoubleFill } from "react-icons/ri";

const ServicesFooter = ({smallDetails}) => {
    return (
        <div>
        <span className='flex items-center gap-3'> <RiCheckDoubleFill className='text-blue-700' />{smallDetails}</span>



        </div>
    );
};

export default ServicesFooter;