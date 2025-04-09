import React from 'react';
import Header from './sub-landing/Header';
import Top from './sub-landing/Top';
import FeaturesBlocks from './sub-landing/FeaturesBlocks';
import Footer from './sub-landing/Footer';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
     
      <Header />
      
      <div className="pt-16 md:pt-20"> 
      <Top />
      <FeaturesBlocks/>

      <p className='text-black text-center'>dsadsadsa</p>

      </div>
            
 
    
      <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
        <Footer/>
      </footer>
    </div>
  );
};

export default MainPage;