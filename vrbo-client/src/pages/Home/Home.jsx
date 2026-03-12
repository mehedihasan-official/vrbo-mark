import EarlyBooking from "./HomeComponents/EarlyBooking";
import HeroSection from "./HomeComponents/HeroSection";
import ListProperty from "./HomeComponents/ListProperty";
import OneKeyBanner from "./HomeComponents/OneKeyBanner";
import OneKeyCard from "./HomeComponents/OneKeyCard";
import PopularDestinations from "./HomeComponents/PopularDestinations";
import PromotionalTiles from "./HomeComponents/PromotionalTiles";

import ValuePropsSection from "./HomeComponents/ValuePropsSection";


const Home = () => {
  return (
    // Root wrapper — switches background and text color for the whole page
    <div className="
      min-h-screen
      bg-white dark:bg-gray-950
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <div className="container mx-auto">

        {/* Hero Section */}
        <HeroSection/>

        {/* One Key Membership Banner */}
        <OneKeyBanner />

        {/* Popular Destinations Carousel */}
        <PopularDestinations />

        {/* Resort Section */}
        {/* <ResortSection /> */}

        {/* Value Props Section */}
        <ValuePropsSection />

        {/* Early Booking Section */}
        <EarlyBooking />

        {/* One Key Card Section */}
        <OneKeyCard />

        {/* Promotional Tiles */}
        <PromotionalTiles />

        {/* List Property */}
        <ListProperty />

      </div>
    </div>
  );
};

export default Home;