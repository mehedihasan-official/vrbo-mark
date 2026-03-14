import { useContext } from "react";
import { TbGenderFemale } from "react-icons/tb";
import { SlGraduation } from "react-icons/sl";
import { MdWorkOutline, MdOutlinePets, MdOutlineLightbulbCircle, MdOutlineRoomService } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loading from "../../components/Loading";



const Profile = () => {
  const { UserInfo, usersData, loading } = useContext(AuthContext);

  if (loading || !UserInfo || !usersData) return <Loading />;
  const user = UserInfo[0] || {};

  const { name, imageURL: img } = usersData;

  const { title = "No title", reviewsCount = 0, rating = 0, hostingCount = 0, gender = "Not specified", education = "Not specified", work = "Not specified", uniqueHomeFeature = "Not specified", funFact = "Not specified", pets = "Not specified", guestInteractions = "Not specified", about = "No description available." } = user;

  return (
    <div className="container mx-auto lg:grid lg:grid-cols-2 my-10 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className='lg:grid lg:justify-center'>
        <div className="grid grid-cols-5 lg:flex p-5 m-10 border border-gray-200 dark:border-gray-700 rounded-[30px] shadow-sm dark:bg-gray-800">
          <div className="flex justify-end items-center col-span-3 pr-8 -m-5 lg:mr-10">
            <div className="flex flex-col items-center lg:pl-5 ml-5">
              <img className="rounded-full w-22 h-22 lg:w-20 lg:h-20" src={img || "https://via.placeholder.com/150"} alt="Profile" />
              <div className="mt-2 text-center">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-white">{name || "N/A"}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center lg:m-5 text-left col-span-2">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{reviewsCount}</h2>
              <p className="text-gray-600 dark:text-gray-400">Reviews</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="flex gap-1 items-center text-2xl font-semibold text-gray-800 dark:text-white">
                {rating} <span className='text-xl'><FaStar /></span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Rating</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{hostingCount}</h2>
              <p className="text-gray-600 dark:text-gray-400">Years Hosting</p>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:grid lg:items-center lg:-ml-10 lg:-mt-5 lg:pr-10 lg:border-l-2 border-gray-300 dark:border-gray-700'>
        <div className="mx-10 lg:col-span-4 lg:space-y-3">
          {[
            { icon: <TbGenderFemale className="text-xl" />, text: gender },
            { icon: <SlGraduation className="text-xl" />, text: `Where I went to school: ${education}` },
            { icon: <MdWorkOutline />, text: `My work: ${work}` },
            { icon: <BsStars className="text-xl" />, text: `What makes my home unique: ${uniqueHomeFeature}` },
            { icon: <MdOutlineLightbulbCircle />, text: `Fun fact: ${funFact}` },
            { icon: <MdOutlinePets />, text: `Pets: ${pets}` },
          ].map((item, i) => (
            <div key={i} className="flex gap-2 items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">{item.icon}</span>
              <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
            </div>
          ))}
          <div className="flex gap-2 mb-2">
            <MdOutlineRoomService className="text-3xl text-gray-600 dark:text-gray-400" />
            <p className="text-gray-700 dark:text-gray-300">For guests, I always: {guestInteractions}</p>
          </div>
          <div className="lg:mx-5 pt-5 px-2 lg:-m-3 lg:w-10/12">
            <p className="text-gray-700 dark:text-gray-300">I'm {name || "N/A"}, {about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
