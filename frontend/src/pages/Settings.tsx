import {
  deleteViewerProfileAPI,
  updateViewerProfileAPI,
} from "@/api/viewer.api";
import { Spinner } from "@/components/ui/spinner";
import Footer from "@/custom_components/Footer";
import Navbar from "@/custom_components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useHandshaking } from "@/hooks/useHandshaking";
import { MessageCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    createdAt,
    username,
    userType,
    reset,
  } = useHandshaking();
  const { logout, token } = useAuth();

  const [updateFirstName, setUpdateFirstName] = useState<string>(firstName!);
  const [updateLastName, setUpdateLastName] = useState<string>(lastName!);

  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [updateLoader, setUpdateLoader] = useState<boolean>(false);
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleUpdateViewer = async () => {
    setUpdateLoader(true);
    try {
      await updateViewerProfileAPI(updateFirstName, updateLastName, token!)
        .then((res) => {
          console.log(res.data.message);

          setFirstName(updateFirstName);
          setLastName(updateLastName);
          setUpdateStatus(false);
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleDeleteViewer = async () => {
    setDeleteLoader(true);
    try {
      await deleteViewerProfileAPI(token!)
        .then(() => {
          handleLogout();
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
        });
    } catch (error: any) {
    } finally {
      setDeleteLoader(false);
    }
  };

  const handleLogout = () => {
    logout();
    reset();

    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (updateFirstName != firstName || updateLastName != lastName) {
      setUpdateStatus(true);
    } else if (updateFirstName === firstName || updateLastName === lastName) {
      setUpdateStatus(false);
    }
  }, [updateFirstName, updateLastName]);

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full p-4 sm:p-6 lg:p-10 bg-white flex-col gap-y-6 lg:gap-y-8 font-jetbrains">
        <div className="flex justify-start items-start w-full flex-col gap-y-2 lg:gap-y-4 border-b border-black pb-6 lg:pb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-neutral-800 uppercase tracking-tight">
            Identity & Profile Settings
          </h1>
          <h6 className="text-xs sm:text-sm text-neutral-600 uppercase tracking-tight w-full lg:w-[50%]">
            Configure your profile here as well as manage comments, Ban, audit
            logs, and more...
          </h6>
        </div>

        <div className="flex justify-center items-center w-full border-t border-b border-black flex-col lg:flex-row">
          <div className="flex justify-start items-start flex-col gap-y-4 lg:gap-y-6 w-full border-b lg:border-b-0 lg:border-r border-black p-4 lg:py-4 lg:pr-8">
            <div className="flex justify-start items-start w-full flex-col gap-y-1 lg:gap-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-neutral-800 uppercase tracking-tight">
                {userType === "VIEWER" ? "Viewer" : "Author"} Profile
              </h1>
              <h6 className="text-[10px] sm:text-xs text-neutral-600 uppercase tracking-tight w-full">
                Kindly never share your username with anyone
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start flex-col sm:flex-row gap-4 lg:gap-x-4 w-full p-3 lg:p-2">
                <div className="w-26 h-22 bg-black shrink-0" />
                <div className="flex justify-start items-start flex-col gap-y-2 w-full">
                  {userType === "VIEWER" && (
                    <span className="text-[10px] font-extrabold text-neutral-800 lowercase duration-200 cursor-pointer">
                      @{username}
                    </span>
                  )}
                  <p className="text-[10px]">
                    Cached globally on Cloudflare edge. Synchronized with public
                    author identity tags.
                  </p>
                  <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-x-4 w-full">
                    <button className="text-[10px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer">
                      Change Profile Picture...
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-[10px] font-semibold text-neutral-800 bg-white p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer"
                    >
                      Terminate session (Log Out)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* For Large screens only */}
            <div className="lg:flex hidden justify-start items-start flex-col gap-y-4 w-full border border-red-600 bg-red-100">
              <div className="flex justify-start items-start gap-x-4 w-full p-3 lg:p-2">
                <div className="flex justify-start items-start flex-col gap-y-2 w-full">
                  <h6 className="text-lg lg:text-xl font-semibold uppercase tracking-tighter">
                    Erase Memory
                  </h6>
                  <p className="text-[10px]">
                    {createdAt?.split("T")[0]} was the day you joined, deleting
                    your account will result in permanent deletion from our
                    servers and database. Account never get retrieved after
                    getting removed.
                  </p>
                  <div className="flex justify-start items-center gap-x-4 w-full">
                    <button
                      onClick={handleDeleteViewer}
                      className="flex items-center gap-x-1 text-[10px] font-semibold text-black bg-red-600 hover:bg-white p-1 border border-black uppercase duration-200 cursor-pointer"
                    >
                      {deleteLoader ? (
                        <Spinner />
                      ) : (
                        <Trash className="text-black w-3 h-3" />
                      )}{" "}
                      Delete my Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-y-4 lg:gap-y-6 w-full p-4 lg:py-4 lg:pl-8">
            <div className="flex justify-start items-start w-full flex-col gap-y-1 lg:gap-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-neutral-800 uppercase tracking-tight">
                Edit Basic Details
              </h1>
              <h6 className="text-[10px] sm:text-xs text-neutral-600 uppercase tracking-tight w-full">
                {updateLoader ? <Spinner /> : "Update your first and last name"}
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start gap-x-4 w-full p-3 lg:p-2">
                <div className="flex justify-start items-start flex-col gap-y-2 w-full">
                  <div className="flex justify-start items-start flex-col sm:flex-row gap-4 lg:gap-x-4 w-full p-1 lg:p-2">
                    <div className="flex flex-col gap-1.5 flex-1 w-full">
                      <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        First Name
                      </label>
                      <input
                        value={updateFirstName}
                        onChange={(e) => setUpdateFirstName(e.target.value)}
                        className="w-full bg-neutral-50 border border-black px-3.5 py-1.5 text-[10px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 w-full">
                      <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        Last Name
                      </label>
                      <input
                        value={updateLastName}
                        onChange={(e) => setUpdateLastName(e.target.value)}
                        className="w-full bg-neutral-50 border border-black px-3.5 py-1.5 text-[10px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {updateStatus && (
                    <div className="flex justify-start items-center gap-x-4 w-full mt-2 lg:mt-2">
                      <button
                        onClick={handleUpdateViewer}
                        className="text-[10px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setUpdateFirstName(firstName!);
                          setUpdateLastName(lastName!);
                          setUpdateStatus(false);
                        }}
                        className="text-[10px] font-semibold text-neutral-800 bg-white p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start flex-col gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start gap-x-4 w-full p-3 lg:p-2">
                <div className="flex justify-start items-start flex-col gap-y-2 w-full">
                  <h6 className="text-lg lg:text-xl font-semibold uppercase tracking-tighter">
                    View All Comments
                  </h6>
                  <p className="text-[10px]">
                    View all the comments you posted over pages of the Delciae.
                  </p>
                  <div className="flex justify-start items-center gap-x-4 w-full">
                    <span className="flex items-center gap-x-1 text-[10px] font-semibold text-black hover:bg-white p-1 border border-black uppercase bg-[#45FF17] duration-200 cursor-pointer">
                      <MessageCircle className="text-black w-3 h-3" /> See My
                      comments
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* For Mobile screens only */}
            <div className="flex lg:hidden justify-start items-start flex-col gap-y-4 w-full border border-red-600 bg-red-100">
              <div className="flex justify-start items-start gap-x-4 w-full p-3 lg:p-2">
                <div className="flex justify-start items-start flex-col gap-y-2 w-full">
                  <h6 className="text-lg lg:text-xl font-semibold uppercase tracking-tighter">
                    Erase Memory
                  </h6>
                  <p className="text-[10px]">
                    {createdAt?.split("T")[0]} was the day you joined, deleting
                    your account will result in permanent deletion from our
                    servers and database. Account never get retrieved after
                    getting removed.
                  </p>
                  <div className="flex justify-start items-center gap-x-4 w-full">
                    <button
                      onClick={handleDeleteViewer}
                      className="flex items-center gap-x-1 text-[10px] font-semibold text-black bg-red-600 hover:bg-white p-1 border border-black uppercase duration-200 cursor-pointer"
                    >
                      {deleteLoader ? (
                        <Spinner />
                      ) : (
                        <Trash className="text-black w-3 h-3" />
                      )}{" "}
                      Delete my Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Settings;
