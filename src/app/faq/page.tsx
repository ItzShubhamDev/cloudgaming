import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is cloud gaming?",
    answer:
      "Cloud gaming allows you to play high-end games without expensive hardware by streaming them from our powerful servers directly to your device.",
  },
  {
    question: "What internet speed do I need?",
    answer:
      "We recommend a minimum of 15 Mbps for 1080p gaming. For 4K gaming, we suggest 35 Mbps or higher for the best experience.",
  },
  {
    question: "Which regions do you support?",
    answer:
      "We currently have servers in North America, Europe, and Asia Pacific regions, with more locations being added regularly.",
  },
  {
    question: "Can I use my own games?",
    answer:
      "Yes! You can install and play games from your existing Steam, Epic Games, or other gaming platform libraries.",
  },
  {
    question: "What happens if I lose connection?",
    answer:
      "Your game session is preserved for 30 minutes in case of disconnection, allowing you to resume exactly where you left off.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400">
            Find answers to common questions about our cloud gaming service
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-gray-800 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-6">
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                <ChevronDown className="h-5 w-5 transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-300">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
