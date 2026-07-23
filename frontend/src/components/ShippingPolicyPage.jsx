import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 sm:px-8 text-left">
      <div className="max-w-[800px] mx-auto bg-transparent space-y-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide mb-4">
            Shipping Policy
          </h1>
          <div className="w-16 h-[2px] bg-black mx-auto"></div>
        </div>

        <div className="space-y-8 font-sans text-[14.5px] leading-relaxed text-[#4a4a45]">
          
          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Standard Delivery Time</h2>
            <p>
              We take pride in our prompt service. All confirmed orders are typically processed and delivered within <strong className="text-black">7 days</strong> across India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Order Processing</h2>
            <p>
              Orders placed before 12:00 PM (IST) on business days will begin processing the same day. Orders placed after this time, or on weekends/public holidays, will begin processing on the next business day. 
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Shipping Costs</h2>
            <p>
              We offer <strong className="text-black">Free Standard Shipping</strong> on all prepaid orders. For Cash on Delivery (COD) orders, a nominal handling fee may apply at checkout.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Order Tracking</h2>
            <p>
              Once your order has been dispatched, you will receive an email and SMS with a tracking number and a link to trace your package. You can also use our Track Order page to stay updated on your shipment's status.
            </p>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-[18px] font-heading font-semibold text-black">Delays & Exceptions</h2>
            <p>
              While we strive to ensure delivery within our 7-day timeline, unforeseen circumstances such as extreme weather, natural disasters, or logistical hurdles may cause minor delays. In such rare events, our support team will keep you proactively informed.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
