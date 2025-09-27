import { NextPage } from "next";
import React from "react";
import ContactHero from "./_components/ContactHero";
import ContactForm from "./_components/ContactForm";
import ContactInfo from "./_components/ContactInfo";
import ContactMap from "./_components/ContactMap";
import ContactCTA from "./_components/ContactCTA";

const ContactPage: NextPage = () => {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ContactForm />
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#F86D72]/5 to-[#ff9aa1]/5 rounded-3xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Contact Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F86D72] rounded-full mt-2" />
                  <p className="text-gray-600">Get personalized book recommendations</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F86D72] rounded-full mt-2" />
                  <p className="text-gray-600">Resolve any order or shipping issues</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F86D72] rounded-full mt-2" />
                  <p className="text-gray-600">Join our book club and community events</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#F86D72] rounded-full mt-2" />
                  <p className="text-gray-600">Provide feedback to improve our service</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email</span>
                  <span className="font-semibold text-[#F86D72]">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-semibold text-[#F86D72]">Immediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Live Chat</span>
                  <span className="font-semibold text-[#F86D72]">Within 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactInfo />
      <ContactMap />
      <ContactCTA />
    </main>
  );
};

export default ContactPage;
