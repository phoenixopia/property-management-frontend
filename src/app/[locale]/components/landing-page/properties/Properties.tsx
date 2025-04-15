"use client"
import React from 'react';

import Header from '../sub-landing/Header';
import Footer from '../sub-landing/Footer';
import MainProperties from './sub-properties/MainProperties';
const Properties = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">

       <Header/>
   
       <div className="pt-16 flex-1 md:pt-20"> 
     <MainProperties/>
      </div>

  
  <footer className="flex w-full bottom-0 bg-gray-100 p-4 text-center text-gray-600 text-sm">

        <Footer/>
        </footer>
    </div>
    
  );
};

export default Properties;