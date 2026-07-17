import React from 'react';
import collectionsImg1 from '../assets/Collections-1.webp';
import collectionsImg2 from '../assets/Collections-2.webp';

const collections = [
  {
    id: 1,
    name: 'The Shirt \u2192',
    image: collectionsImg1,
  },
  {
    id: 2,
    name: 'The Pant \u2192',
    image: collectionsImg2,
  }
];

const Collections = () => {
  return (
    <div className="bg-[#f5f5f0] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-10 text-left">
          <h2 className="text-[32px] md:text-[44px] font-heading font-medium text-[#1a1a1a]">
            Collections
          </h2>
        </div>

        {/* Collections Grid (Flex wrap to avoid stretching wide screens and enforce sizes) */}
        <div className="flex flex-wrap gap-x-8 gap-y-12">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className="group flex flex-col text-left cursor-pointer w-[340px]"
            >
              <div className="w-full h-[400px] bg-gray-200 overflow-hidden mb-4">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-center object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                />
              </div>
              <h3 className="text-[16px] md:text-[18px] text-[#1a1a1a] font-heading font-medium group-hover:underline decoration-[1px] underline-offset-4">
                {collection.name}
              </h3>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Collections;
