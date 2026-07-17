import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f0] pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-24">
          
          {/* Left: Statement */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-[17px] md:text-[20px] font-heading font-medium text-[#1a1a1a] max-w-[400px] leading-snug">
              Handcrafted in India. Inspired by Heritage.
            </h2>
          </div>
          
          {/* Right: Quick Links */}
          <div className="w-full md:w-1/2 md:pl-20">
            <h3 className="text-[15px] md:text-[17px] font-heading font-medium text-[#1a1a1a] mb-5">
              Quick links
            </h3>
            <ul className="space-y-3 font-body text-[13px] md:text-[14px] text-[#666666]">
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Search</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Return / Exchange Policy</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#1a1a1a] transition-colors">Return/Exchange</a></li>
            </ul>
          </div>

        </div>
        
        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-start items-center text-left">
          <p className="text-[12px] font-body text-[#777777]">
            &copy; {new Date().getFullYear()}, FineLegends Powered by Shopify &middot; Privacy policy &middot; Refund policy &middot; Terms of service
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
