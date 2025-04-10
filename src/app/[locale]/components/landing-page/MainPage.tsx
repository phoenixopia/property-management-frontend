import React from 'react';
import Header from './sub-landing/Header';
import Top from './sub-landing/Top';
import FeaturesBlocks from './sub-landing/FeaturesBlocks';
import Footer from './sub-landing/Footer';
import AboutTheSystem from './sub-landing/AboutTheSystem';
import ContactFast from './sub-landing/ContactFast';
const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
     
      <Header />
      
      <div className="pt-16 md:pt-20"> 
      <Top />
      <FeaturesBlocks/>
      <AboutTheSystem/>

      </div>
            
 
      <ContactFast/>
      <footer className="flex w-full bg-gray-100 p-4 text-center text-gray-600 text-sm">
        <Footer/>
      </footer>
    </div>
  );
};

export default MainPage;