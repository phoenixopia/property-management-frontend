'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendEmail } from '@/actions/sendEmail';

const SendMail = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  
  const mutation = useMutation({
    mutationFn: (formData: FormData) => sendEmail(formData),
    onSuccess: () => {
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  return (
    <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-800 sm:text-sm">
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        
        {mutation.isSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
            Email sent successfully!
          </div>
        )}
        
        {mutation.isError && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {mutation.error.message || 'Failed to send email'}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>
          
          <div className="py-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className={`py-2 px-4 bg-[#285e67] text-white rounded-sm ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1e4a52]'}`}
            >
              {mutation.isPending ? 'Sending...' : 'Send message'}
            </button>
          </div>
        </form>
        {/* <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10  bg-[url(/tech-back.jpg)] bg-no-repeat bg-cover -z-10 " aria-hidden="true"></div> */}
          {/* <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10 bg-white/80 bg-no-repeat bg-cover " aria-hidden="true"></div> */}

      </div>
    </section>
  );
};

export default SendMail;