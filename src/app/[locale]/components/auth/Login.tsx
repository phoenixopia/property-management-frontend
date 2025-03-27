const Home = () => {
  return (
    <div className="flex h-screen bg-white relative">
      {/* Image at the top of the screen for small screens */}
<div className="md:hidden absolute top-0 left-1/2 transform -translate-x-1/2 w-full">
  <img
    src="Images/hi.jpeg"
    alt="Top Image"
    className="w-full h-56 object-cover rounded-b-[4rem]"
  />

  {/* overlay */}
  <div className="md:hidden absolute top-0 left-1/2 transform -translate-x-1/2 w-full bg-blue-900 opacity-30 rounded-tr-[4rem] rounded-br-[4rem]"></div>

  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white font-semibold h-1/3 flex flex-col items-center justify-center">
  <p className="text-center">
    PROPERTY MANAGEMENT
  </p>
  <p className="text-center">
    SYSTEM
  </p>
</div>



  {/* Image - Visible on small screens, positioned between top and bottom */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden block">
    <img
      src="Images/circle-user-solid.png"
      alt="Profile"
      className="w-20 h-20 mt-45 rounded-full border-4 bg-white border-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
    />
  </div>
</div>


      {/* Left side: Image Section - Hidden on mobile */}
      <div className="w-7/12 flex items-center justify-center overflow-hidden hidden flex-grow md:block">
        <div
          className="w-full h-full bg-cover bg-center rounded-tr-[4rem] rounded-br-[4rem]"
          style={{
            backgroundImage:
              'url(/Images/hi.jpeg), linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))',
          }}
        ></div>
        {/* Blue-black overlay filter */}
        <div className="w-6/12 flex absolute top-0 left-0 h-full bg-blue-900 opacity-30 rounded-tr-[4rem] rounded-br-[4rem]"></div>
      </div>

      {/* Center Image - Hidden on mobile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div></div>
        <img
          src="Images/circle-user-solid.png"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 bg-white border-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
        />
      </div>

      {/* right side section */}
      <div className="flex justify-center items-center h-screen w-full flex-grow md:w-7/12 mt-20 md:mt-0">
      <div className="bg-white p-6 pt-40 w-[32rem] md:pt-20 md:ml-8">
      <h2 className="text-3xl font-semibold mb-2 text-center dark:text-black">
            WELCOME
          </h2>
          <p className="text-base mb-2 text-center dark:text-black">
            Sign in to continue
          </p>

          <form>
            {/* Email Field */}
            <div className="mb-3 relative">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-800 dark:text-white"
              >
                Email ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-gray-800 text-lg"
                  placeholder="Enter your email"
                  required
                />
                {/* Envelope Icon on the right */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-3 relative">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-800 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:bg-gray-800 text-lg"
                  placeholder="Enter your password"
                  required
                />
                {/* Lock Icon on the right */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
            </div>

            {/* Remember Me Checkbox & Forgot Password Link */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-base text-gray-800 dark:text-black"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="/forgot-password"
                  className="text-[#223B69] text-base hover:text-blue-700 dark:text-black"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-16 h-16 flex items-center justify-center bg-[#223B69] text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-base dark:text-black">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#223B69] text-base hover:text-blue-700"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
