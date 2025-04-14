import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide.",
  },
  {
    question: "How can I track my order?",
    answer: "You will receive a tracking link via email after purchase.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left Side - Title & Message */}
        <div className="flex flex-col justify-center space-y-5 self-start rounded-xl p-6 shadow-sm">
          <MessageSquare className="h-12 w-12" />
          <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lg opacity-80">
            Find answers to the most commonly asked questions below.
          </p>
        </div>

        {/* Right Side - FAQ Accordion */}
        <div className="rounded-xl bg-white p-6 md:drop-shadow">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="overflow-hidden rounded-lg border border-gray-200"
              >
                <AccordionTrigger className="flex w-full justify-between rounded-lg bg-gray-50 p-4 text-lg font-medium hover:bg-gray-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
