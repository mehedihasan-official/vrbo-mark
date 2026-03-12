import { FaStar } from "react-icons/fa";

const OneKeyBanner = () => {
  return (
    <div className="bg-[#191E3B] py-6 m-4 rounded-2xl md:py-8">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col sm:flex-row md:justify-between items-center justify-center gap-6 text-center sm:text-left max-w-4xl mx-auto">
          
          <div className="flex items-center gap-2 text-white">
            <img 
              src="https://a.travel-assets.com/egds/marks/onekey__standard__always_light.svg" 
              alt="" 
              className="h-10 w-10" 
            />
            <p className="text-xl text-start font-semibold">
              Members always get our best prices when signed in
            </p>
          </div>
          
          {/* ✅ Fixed Button Wrapper */}
          <div className="flex flex-col md:flex-row gap-5  w-full md:w-auto">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors">
              Sign in
            </button>

            <button className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Learn more
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OneKeyBanner;
