import { useEffect, useState } from "react";

//assets
import { GoPlus } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import fullLogo from "../assets/images/logo.svg";

const Navbar = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollTop = window.pageYOffset;
  //     if (currentScrollTop > lastScrollTop) {
  //       // Scrolling down
  //       setScrollingUp(false);
  //     } else {
  //       // Scrolling up
  //       setScrollingUp(true);
  //     }
  //     setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollTop]);

  return (
    <>
      <TopNavbar isScroll={scrollingUp ? true : false} />
      <BottomNavbar isScroll={scrollingUp ? true : false} />
    </>
  );
};

export default Navbar;

const TopNavbar = ({ isScroll }: { isScroll: boolean }) => {
  return (
    <div
      className={`top-navbar flex justify-between w-full px-6 h-16 py-4 border-b ease-in duration-300 ${
        isScroll ? "sticky top-0" : "hidden"
      }`}
    >
      <div className="flex items-center gap-6">
        <img src={fullLogo} alt="fullLogo" className="h-6" />
        <div className="max-w-md mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-full  bg-stone-50 overflow-hidden">
            <div className="grid place-items-center w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pl-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-stone-50 pl-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 text-base">
        <div className="flex items-center gap-2 opacity-50 cursor-pointer hover:opacity-100">
          <FaRegEdit />
          <span>Write</span>
        </div>
        <IoIosNotificationsOutline className="text-2xl opacity-50 cursor-pointer hover:opacity-100" />
        <img src="" alt="" className="rounded-full h-8 w-8 border" />
      </div>
    </div>
  );
};

const BottomNavbar = ({ isScroll }: { isScroll: boolean }) => {
  const [selectedTab, setSelectedTab] = useState("For you");

  return (
    <div
      className={`flex w-full sticky pb-4 ease-in duration-300 ${
        isScroll ? "top-16 pt-10" : "top-0 pt-5"
      }`}
    >
      <div
        className={`flex gap-8 w-full max-w-screen-xl m-auto border-b items-center`}
      >
        <GoPlus className="text-gray-300 text-xl pb-1 cursor-pointer" />
        {allTabs?.map((eachTab, index) => {
          return (
            <div
              key={eachTab + index}
              className={`pb-3 w-max cursor-pointer border-b border-transparent text-sm text-stone-600/100 font-medium hover:text-stone-950 ${
                selectedTab === eachTab && "border-current border-gray-950"
              }`}
              onClick={() => {
                setSelectedTab(eachTab);
              }}
            >
              {eachTab}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const allTabs = ["For you", "Following", "Programming"];
