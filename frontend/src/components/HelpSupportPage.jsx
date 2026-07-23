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
        <p className="text-[14px] text-gray-500 font-sans tracking-wide uppercase mt-8 border border-neutral-300 inline-block px-6 py-2">
          Coming Soon
        </p>
        <div className="pt-10">
          <p className="text-[13px] text-gray-500 font-sans mb-4">In the meantime, you can reach us at:</p>
          <a href="/contact" onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }));
          }} className="text-black font-semibold uppercase tracking-widest text-[12px] underline hover:opacity-70 transition-opacity">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
