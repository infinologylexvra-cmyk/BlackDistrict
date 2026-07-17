import React from 'react';
import homepageImg from '../assets/homepage-1.webp';

const Hero = () => {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Image (Normal flow to dictate full container height) */}
      <img 
        src={homepageImg} 
        alt="FineLegends Old Money Collection" 
        width="2160"
        height="2700"
        className="w-full h-auto block"
      />
      
      {/* Subtle dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      {/* Content */}
      <div className="absolute z-10 w-full px-4 inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
        <div className="w-full flex flex-col items-start text-left max-w-[800px]">
          <h1 className="text-white font-heading font-semibold text-[50px] md:text-[60px] leading-[72px] w-full max-w-[800px] mb-4 drop-shadow-md">
            The Standard of Elegance.
          </h1>
          <p className="text-white font-body text-[18px] md:text-[20px] leading-[30px] w-full max-w-[800px] mb-8 drop-shadow-md">
            Discover the signature Old Money collection, tailored for sophistication.
          </p>
          <a 
            href="#products" 
            className="bg-[#002349] text-white font-body font-bold text-[13px] w-[147px] h-[37px] flex items-center justify-center rounded hover:opacity-90 transition-all shadow-md"
          >
            Discover the Craft
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
