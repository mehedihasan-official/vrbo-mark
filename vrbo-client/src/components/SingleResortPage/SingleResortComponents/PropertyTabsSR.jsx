const TABS = ["Overview", "Amenities", "Policies", "Reviews", "Location"];

const PropertyTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200 mb-7 overflow-x-auto">
    {TABS.map((tab) => {
      const isActive = activeTab === tab.toLowerCase();
      return (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`px-5 py-3 text-sm whitespace-nowrap transition border-b-2 -mb-px
            ${
              isActive
                ? "font-extrabold text-gray-900 border-gray-900"
                : "font-medium text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300"
            }`}
        >
          {tab}
        </button>
      );
    })}
  </div>
);

export default PropertyTabs;