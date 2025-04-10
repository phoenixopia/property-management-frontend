import React from 'react';
import Header from '../sub-landing/Header';
import Top from '../sub-landing/Top';
import FeaturesBlocks from '../sub-landing/FeaturesBlocks';
import Footer from '../sub-landing/Footer';
import AboutTheSystem from '../sub-landing/AboutTheSystem';
import ContactFast from '../sub-landing/ContactFast';
import GetInTouch from './sub-contact/GetInTouch';
import SendMail from './sub-contact/SendMail';
const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
     <div>
     <Header />

     </div>
      
      <div className="pt-16 flex-1 md:pt-20"> 
       <GetInTouch/>

      </div>

      <div className='flex justify-center items-center w-full'>
      
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12908.762409469511!2d38.80446972178915!3d9.016798518665377!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0xdd7ff05822cd804b!2s2R92%2BG3%2C%20Addis%20Ababa%2C%20Ethiopia!5e1!3m2!1sen!2sus!4v1744276048336!5m2!1sen!2sus" width="50%" height="450" loading="lazy" ></iframe>
      
      </div>
      <div>
        <SendMail/>
      </div>
     
            
      <ContactFast/>
 
      <footer className="flex w-full bottom-0 bg-gray-100 p-4 text-center text-gray-600 text-sm">

        <Footer/>
      </footer>
    </div>
  );
};

export default ContactUs;