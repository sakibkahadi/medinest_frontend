import { Parallax } from "react-parallax"
import 'daisyui/dist/full.css';
import img from '../../assets/ambulance/banner.png'
import BannerFooter from "../../components/AmbulanceComponents/BannerFooter";
const Banner = () => {
  return (
  <Parallax
  blur={{min:-50, max:50}}
  bgImage={img}

  strength={-200}
  >
      <div className="hero min-h-[400px] ">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content ">
        <div className="text-white font-normal p-2 md:-ml-44 lg:-ml-[350px] xl:-ml-[580px]">
          <h1 className="text-1x mb-2 md:text-2xl font-semibold ">
            Ambulance Service
          </h1>
          <h2 className="text-2xl font-bold  mb-10 md:text-3xl lg:text-4xl ">
            Rent a <span className="text-blue-400">Prompt</span>,{" "}
            <span className="text-blue-300"> High quality </span>, <br />
            <span className="text-yellow-400"> Emergency </span>ambulance at
            your need
          </h2>

          <div className="text-sm mb-20 text-white  ">
            <BannerFooter text="Best price, Quality Service, On-Time Gurantee"></BannerFooter>
            <BannerFooter text="Trusted, Certified & Skilled Driver"></BannerFooter>
            <BannerFooter text="Hotline: 014018600 700"></BannerFooter>
          </div>
        </div>
      </div>
    </div>
  </Parallax>
  );
};

export default Banner;
