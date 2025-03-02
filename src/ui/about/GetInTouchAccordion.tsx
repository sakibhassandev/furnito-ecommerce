"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/definitions";

const GetInTouchFaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: "What materials do you use in your furniture?",
      answer:
        "We use premium-grade materials including solid hardwoods (oak, maple, walnut), high-resilience foams, top-grain leather, and premium fabrics. All our materials are carefully selected for durability and comfort.",
    },
    {
      question: "Do you offer assembly services?",
      answer:
        "Yes! Our white-glove delivery service includes professional assembly in your home. Our trained team will ensure your furniture is perfectly set up and all packaging is removed.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all standard items. Custom pieces have specific terms. All returns must be in original condition. We'll arrange pickup and provide a full refund minus shipping costs.",
    },
    {
      question: "How long is the warranty period?",
      answer:
        "We provide a 10-year warranty on frames and construction, 5-year warranty on mechanisms and springs, and 2-year warranty on fabrics and leather. This covers manufacturing defects and normal wear.",
    },
    {
      question: "Do you offer custom furniture options?",
      answer:
        "Yes, we offer customization options including fabric selection, size modifications, and completely custom pieces. Contact our design team to discuss your specific requirements.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="border border-amber-200 rounded-lg overflow-hidden hover:border-amber-300 transition-colors"
        >
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-amber-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-left font-medium text-gray-900">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-amber-600 transition-transform ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-48" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4 bg-amber-50">
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetInTouchFaqAccordion;
