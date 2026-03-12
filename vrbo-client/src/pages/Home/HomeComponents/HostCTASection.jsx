const HostCTASection = () => {
  return (
    <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://forever.travel-assets.com/flex/flexmanager/mediaasset/1387310-0_2-2x.jpg?impolicy=fcrop&w=1400&h=600&q=mediumHigh')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Rent your property confidently with Vrbo
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-10">
            With live-support, quick signup, and highly-rated guests, hosting on Vrbo can feel like a vacation.
          </p>
          <button className="px-8 py-3 md:px-10 md:py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            List your property
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostCTASection;