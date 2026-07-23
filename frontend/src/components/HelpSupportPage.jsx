import React from 'react';

const HelpSupportPage = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-[60vh] flex items-center justify-center text-[#1a1a1a] font-body py-16 px-4">
      <div className="max-w-[720px] mx-auto text-center space-y-6">
        <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide">
          Help & Support
        </h1>
        <div className="w-16 h-[2px] bg-black mx-auto my-4"></div>
        <p className="text-[15px] sm:text-[17px] text-[#6b6b66] font-sans max-w-lg mx-auto">
          Our comprehensive Help & Support center is currently being crafted to provide you with the best assistance possible.
        </p>
        <a href="/contact" onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }));
        }} className="text-[14px] text-black font-semibold font-sans tracking-widest uppercase mt-8 border border-black hover:bg-black hover:text-white transition-colors inline-block px-8 py-3">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default HelpSupportPage;
