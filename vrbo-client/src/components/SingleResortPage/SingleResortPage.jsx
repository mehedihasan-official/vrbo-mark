import { useContext, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import BookingCard from "./SingleResortComponents/BookingCardSR";
import ImageGallery from "./SingleResortComponents/ImageGallerySR";
import PropertyDetails from "./SingleResortComponents/PropertyDetailsSR";
import PropertyHeader from "./SingleResortComponents/PropertyHeaderSR";
import PropertyTabs from "./SingleResortComponents/PropertyTabsSR";

const SingleResortPage = () => {
  const { id } = useParams();
  const { hotelData } = useContext(AuthContext);
  const resort = hotelData?.find((item) => item.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("overview");
  const [guests] = useState(2);

  if (!resort) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3 text-red-600">
            Resort Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Please check the URL or try another listing.
          </p>
        </div>
      </div>
    );
  }

  const images = Array.isArray(resort.image) ? resort.image : [resort.image];
  const pricePerNight = parseFloat(
    resort.price?.replace(/[^0-9.]/g, "") || "367",
  );

  return (
    <div className="max-w-6xl mx-auto px-6 pb-16 bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 py-3">
        <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          Home
        </a>
        <span>›</span>
        <span>Vacation rentals</span>
        <span>›</span>
        <span>{resort.location || "Gulf Side"}</span>
      </div>

      {/* Photo Gallery */}
      <ImageGallery images={images} />

      {/* Title, location, badges, share/save */}
      <PropertyHeader resort={resort} />

      {/* Tab Navigation */}
      <PropertyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
        {/* LEFT — property details */}
        <PropertyDetails resort={resort} guests={guests} />

        {/* RIGHT — booking card */}
        <BookingCard pricePerNight={pricePerNight} />
      </div>

      {/* Important Information Banner */}
      <div className="mt-10 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 transition-colors duration-300">
        <h3 className="font-extrabold text-base text-amber-800 dark:text-amber-400 mb-2">
          ⚠️ Important information
        </h3>
        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
          This property requires a security deposit of $500 due at time of
          booking. Cancellation policy: Full refund if cancelled 30+ days before
          check-in. 50% refund if cancelled 14–29 days before. No refund within
          14 days of check-in. Maximum occupancy is 8 guests. Quiet hours 10 PM
          – 8 AM. No parties or events permitted. Pet fee: $75 per pet per stay.
        </p>
      </div>
    </div>
  );
};

export default SingleResortPage;