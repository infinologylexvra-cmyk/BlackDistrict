import React from 'react';

const HomeCollections = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#f5f5f0] text-black py-12 px-6 md:px-12 lg:px-20 text-left font-serif border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[32px] md:text-[40px] font-heading font-medium text-[#1a1a1a] mb-8">
          Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card 1: The Shirt */}
          <div className="group flex flex-col text-left">
            <a 
              href="/collections/shirts"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('shirt');
              }}
              className="relative w-full aspect-[4/3] overflow-hidden mb-4 bg-gray-100 border border-[#e5e5e0] block"
            >
              <img
                src="/image/collection-shirt.png"
                alt="The Shirt Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </a>
            <h3 className="text-[16px] text-[#1a1a1a]">
              <a
                href="/collections/shirts"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('shirt');
                }}
                className="inline-flex items-center hover:underline decoration-1 underline-offset-4"
              >
                <span className="font-semibold mr-1.5 font-serif">The Shirt</span>
                <span className="text-[16px] font-sans font-normal">&rarr;</span>
              </a>
            </h3>
          </div>

          {/* Card 2: The Pant */}
          <div className="group flex flex-col text-left">
            <a 
              href="/collections/pantts"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('pant');
              }}
              className="relative w-full aspect-[4/3] overflow-hidden mb-4 bg-gray-100 border border-[#e5e5e0] block"
            >
              <img
                src="/image/collection-pant.png"
                alt="The Pant Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </a>
            <h3 className="text-[16px] text-[#1a1a1a]">
              <a
                href="/collections/pantts"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('pant');
                }}
                className="inline-flex items-center hover:underline decoration-1 underline-offset-4"
              >
                <span className="font-semibold mr-1.5 font-serif">The Pant</span>
                <span className="text-[16px] font-sans font-normal">&rarr;</span>
              </a>
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeCollections;
