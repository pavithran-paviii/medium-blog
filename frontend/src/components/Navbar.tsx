import { useEffect, useState } from "react";

//assets
import { GoPlus } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import fullLogo from "../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../Context/GlobalContext";

const allTabs = ["For you", "Following", "Programming"];

interface UserStructure {
  name?: string;
  id: string;
  email: string;
}

const Navbar = ({ onlyTop }: { onlyTop?: boolean }) => {
  return (
    <>
      <TopNavbar />
      {!onlyTop && <BottomNavbar />}
    </>
  );
};

export default Navbar;

const TopNavbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useGlobalContext();
  const [userDetails, setUserDetails] = useState<Partial<UserStructure>>({});

  //functions
  async function getUserDetails() {
    try {
      let response = await axios.get(
        "https://backend.pavithranr65.workers.dev/api/v1/me",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("medium-clone")}`,
          },
        }
      );
      if (response?.data.status) {
        setUserDetails(response?.data?.data);
      }
    } catch (error) {
      toast.error("Error while trying to get user details!");
      console.log(error, "User details getching error");
    }
  }

  //renderings

  useEffect(() => {
    if (localStorage.getItem("medium-clone")) {
      getUserDetails();
    }
  }, []);

  return (
    <div
      className={`top-navbar flex justify-between w-full px-6 h-16 py-4 border-b ease-in duration-300 bg-white sticky top-0 z-10`}
    >
      <div className="flex items-center gap-6">
        <img
          src={fullLogo}
          alt="fullLogo"
          className="h-6"
          onClick={() => navigate("/")}
        />
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
              onChange={(event) => setSearchQuery(event?.target?.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 text-base">
        {localStorage.getItem("medium-clone") ? (
          <>
            <div
              className="flex items-center gap-2 opacity-50 cursor-pointer hover:opacity-100"
              onClick={() => navigate("/new-story")}
            >
              <FaRegEdit />
              <span>Write</span>
            </div>
            <div className="font-semibold border rounded-full h-8 w-8 flex items-center justify-center">
              {userDetails?.name?.charAt(0)?.toUpperCase()}
            </div>
            <CgLogOut
              className="text-xl cursor-pointer"
              onClick={() => {
                localStorage.removeItem("medium-clone");
                window.location.reload();
              }}
            />
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="px-8 py-2 bg-black text-white rounded-md cursor-pointer border border-black hover:bg-white hover:text-black ease-in duration-150"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const BottomNavbar = () => {
  const [selectedTab, setSelectedTab] = useState("For you");

  return (
    <div
      className={`flex w-full sticky pb-4 ease-in duration-300 bg-white pt-5 top-16`}
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
                selectedTab === eachTab && "border-gray-950"
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

export const NewArticleNavbar = ({
  createNewBlog,
}: {
  createNewBlog: () => void;
}) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<Partial<UserStructure>>({});

  //functions
  async function getUserDetails() {
    try {
      let response = await axios.get(
        "https://backend.pavithranr65.workers.dev/api/v1/me",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("medium-clone")}`,
          },
        }
      );
      if (response?.data.status) {
        setUserDetails(response?.data?.data);
      }
    } catch (error) {
      toast.error("Error while trying to get user details!");
      console.log(error, "User details getching error");
    }
  }

  //renderings

  useEffect(() => {
    if (localStorage.getItem("medium-clone")) {
      getUserDetails();
    }
  }, []);

  return (
    <div
      className={`top-navbar flex justify-between w-full px-16 h-16 py-4 border-b bg-white`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between w-full">
        <div className="flex items-center gap-6">
          <img
            src={fullLogo}
            alt="fullLogo"
            className="h-6"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="flex items-center gap-6 text-base">
          {localStorage.getItem("medium-clone") ? (
            <>
              <button
                className="flex items-center gap-2 text-white cursor-pointer bg-green-700 py-1 px-4 rounded-full"
                onClick={createNewBlog}
              >
                <span>Publish</span>
              </button>
              <div className="font-semibold border rounded-full h-8 w-8 flex items-center justify-center">
                {userDetails?.name?.charAt(0)?.toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-8 py-2 bg-black text-white rounded-md cursor-pointer border border-black hover:bg-white hover:text-black ease-in duration-150"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
