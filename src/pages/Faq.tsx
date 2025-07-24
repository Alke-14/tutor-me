import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react";


function Faq() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-4xl text-center my-8">Frequently Asked Questions</h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is tutor.me?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance border-r-2 border-l-2 border-r-blue-300 border-l-blue-300">
            <p>
                Tutor.me is an innovative tutoring platform designed to
                assist students with an AI tutor across various subjects and
                educational levels. Our mission is to provide personalized,
                accessible, and effective learning experiences that fit everyone's needs.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does the AI tutor work?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance border-r-2 border-l-2 border-r-blue-300 border-l-blue-300">
            <p>
                The AI tutor is powered with Google Gemini's latest version to understand
                your questions and provide accurate, helpful responses. It can assist
                with explanations, problem-solving, and even practice exercises across
                a wide range of subjects.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can it guarantee accurate responses?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance border-r-2 border-l-2 border-r-blue-300 border-l-blue-300">
            <p>
                While the AI tutor is designed to provide accurate and helpful information,
                it is important to verify critical information, especially for academic or
                professional use. The AI is a tool to assist learning, not a replacement for
                thorough research or expert advice.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What if I don't have any learning disabilities?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance border-r-2 border-l-2 border-r-blue-300 border-l-blue-300">
            <p>
                If you don't have any learning disabilities, you can still benefit from the
                AI tutor's personalized approach. It can adapt to your learning style and
                preferences, providing explanations and resources that suit your needs. 
                Learning is for everyone!
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
export default Faq
