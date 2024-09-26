
import image1 from "../../../assets/login/Frame (3).png";
import image2 from "../../../assets/login/Frame.png";
const Design = () => {
    return (
        <div className=" h-fit  md:h-screen relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/src/assets/login/background.png')",
            }}
          ></div>
          <img
            className=" p-1 md:p-2 absolute w-1/3  md:w-1/2  right-5  "
            src={image1}
            alt=""
          />
          <div className="relative  py-16  md:p-5 flex justify-center items-center h-full">
            <img className=" h-60 md:h-80 lg:h-96" src={image2} alt="Overlay" />
          </div>
        </div>
    );
};

export default Design;