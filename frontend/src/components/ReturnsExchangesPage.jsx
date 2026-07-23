import React from 'react';

const ReturnsExchangesPage = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 sm:px-8 text-left">
      <div className="max-w-[800px] mx-auto bg-transparent space-y-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide mb-4">
            Returns & Exchanges
          </h1>
          <div className="w-16 h-[2px] bg-black mx-auto"></div>
        </div>

        <div className="space-y-8 font-sans text-[14.5px] leading-relaxed text-[#4a4a45]">
          
          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">7-Day Easy Returns</h2>
            <p>
              We stand behind the quality of our garments. If you are not completely satisfied with your purchase, you may return it within 7 days of receiving your order for a full refund or exchange.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Conditions for Return</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unworn, unwashed, and in their original condition with all tags attached.</li>
              <li>Footwear must be returned in its original box without any postage labels directly on the box.</li>
              <li>Sale or promotional items might be subject to final sale policies unless defective.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">How to Initiate a Return or Exchange</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Contact our customer support team at <strong className="text-black">support@blackdistrict.store</strong> with your order number.</li>
              <li>Our team will provide you with a return authorization and shipping instructions.</li>
              <li>Pack the item securely and drop it off at the designated courier service.</li>
            </ol>
            <p className="mt-4 italic">
              Note: Reverse pickup might take 2-4 business days depending on your location.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Refund Processing</h2>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed to your original method of payment within 5-7 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ReturnsExchangesPage;
