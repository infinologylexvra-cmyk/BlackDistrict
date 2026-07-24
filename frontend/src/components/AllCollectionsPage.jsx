import React from 'react';

const COLLECTIONS_DATA = [
  {
    id: 'col1',
    name: 'Aura Signature Collection',
    image: '/image/c1.jpg',
    path: 'catalogue'
  },
  {
    id: 'col2',
    name: 'Monaco Resort Edition',
    image: '/image/c2.jpg',
    path: 'catalogue'
  },
  {
    id: 'col3',
    name: 'BlackDistrict™ Signature Luxe Collection',
    image: '/image/c3.jpg',
    path: 'catalogue'
  },
  {
    id: 'col4',
    name: 'Elegance Silk Blend Combo',
    image: '/image/c4.jpg',
    path: 'catalogue'
  },
  {
    id: 'col5',
    name: 'Classic White & Earthy Trousers Set',
    image: '/image/c5.jpg',
    path: 'catalogue'
  },
  {
    id: 'col6',
    name: 'Midnight Navy Signature Combo',
    image: '/image/c6.jpg',
    path: 'catalogue'
  }
];

const AllCollectionsPage = ({ onNavigate }) => {
  const handleCollectionClick = (path, e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-[#1a1a1a] font-sans py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Title matching screenshot */}
        <h1 className="text-[36px] sm:text-[44px] font-heading font-serif text-[#11233b] mb-10 tracking-tight">
          Collections
        </h1>

        {/* 3-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {COLLECTIONS_DATA.map((col) => (
            <div 
              key={col.id}
              onClick={(e) => handleCollectionClick(col.path, e)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Card Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-100 relative">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Title & Arrow Below Image matching screenshot */}
              <div className="text-left">
                <h3 className="text-[16px] sm:text-[18px] font-serif text-[#2a2a2a] group-hover:text-black transition-colors inline-flex items-center gap-1.5 font-medium">
                  {col.name} <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCollectionsPage;
