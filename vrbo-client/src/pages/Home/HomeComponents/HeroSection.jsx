import SearchBar from "../../../components/SearchBar/SearchBar";
import HeroSectionImage from "../../../assets/images/hero-section-image.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-[400px] md:min-h-[400px] lg:min-h-[400px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-start bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroSectionImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute  inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Title */}
        <div className="pt-12 md:pt-16 text-start md:text-center">
          <h1 className="text-3xl sm:text-4xl md:text-2xl lg:text-4xl font-normal text-white drop-shadow-lg">
            Entire place, just for you
          </h1>
        </div>

        {/* Search Bar - Absolute Bottom */}
        <div className="absolute -bottom-80 left-0 right-0 px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="container mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;