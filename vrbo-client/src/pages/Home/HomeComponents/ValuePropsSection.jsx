import { FaHeadset, FaHome, FaShieldAlt } from "react-icons/fa";


const ValuePropsSection = () => {
  const valueProps = [
    {
      icon: <FaHome className="text-3xl md:text-4xl text-[#191e3b] dark:text-blue-400" />,
      title: "We know just the place",
      description:
        "Near the beach. By the slopes. Find stays for every occasion.",
    },
    {
      icon: <FaShieldAlt className="text-3xl md:text-4xl text-[#191e3b] dark:text-blue-400" />,
      title: "Our VrboCare™ guarantee",
      description:
        "If your stay goes sideways, we'll step in—we'll always aim to make it right.",
    },
    {
      icon: <FaHeadset className="text-3xl md:text-4xl text-[#191e3b] dark:text-blue-400" />,
      title: "On call day or night",
      description:
        "Real people. Real support. 24/7—before, during, or after your stay.",
    },
  ];

  return (
    <div className="py-12 m-8 md:py-16 rounded-2xl 
      bg-[#ebf5ff] dark:bg-gray-900 
      transition-colors duration-300">
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="flex gap-5 md:gap-4 items-center md:items-start text-start"
            >
              {/* Icon Wrapper */}
              <div className="p-3 rounded-full 
                bg-[#c8dff9] dark:bg-gray-800 
                transition-colors duration-300">
                {prop.icon}
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl font-semibold 
                  text-[#191e3b] dark:text-white 
                  transition-colors duration-300">
                  {prop.title}
                </h3>

                <p className="text-base font-medium 
                  text-gray-600 dark:text-gray-400 
                  max-w-sm mt-1 transition-colors duration-300">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ValuePropsSection;