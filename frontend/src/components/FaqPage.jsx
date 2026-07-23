import React from 'react';

const FaqPage = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day return and exchange policy. Items must be unworn, unwashed, and in their original condition with all tags attached."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard delivery typically takes 7 days across India. Once dispatched, you'll receive a tracking number."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within India. We are working on expanding our reach globally."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI, Paytm, and Net Banking securely via Razorpay."
    },
    {
      question: "How can I track my order?",
      answer: "You can visit our Track Order page and enter your Order ID to get real-time status updates on your shipment."
    }
  ];

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 sm:px-8 text-left">
      <div className="max-w-[800px] mx-auto bg-transparent space-y-10">
        
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-16 h-[2px] bg-black mx-auto"></div>
        </div>

        <div className="space-y-8 font-sans">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#e5e5e0] pb-6">
              <h3 className="text-[18px] font-heading font-semibold text-black mb-3">
                {faq.question}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-[#4a4a45]">
                {faq.answer}
              </p>
            </div>
          ))}
          
          <div className="pt-8 text-center">
            <p className="text-[14px] text-gray-500 font-sans mb-4">Still have questions?</p>
            <a href="/contact" onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'contact' }));
            }} className="inline-block px-8 py-3 bg-black text-white text-[12px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
