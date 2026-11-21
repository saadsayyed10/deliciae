import { Button } from "@/components/ui/button";
import Footer from "@/custom_components/Footer";
import Navbar from "@/custom_components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useHandshaking } from "@/hooks/useHandshaking";
import { MessageCircle, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { firstName, lastName, createdAt, username, userType, reset } =
    useHandshaking();
  const { logout, token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    reset();

    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:p-10 p-6 bg-white flex-col lg:gap-y-8 font-jetbrains">
        <div className="flex justify-start items-start w-full flex-col lg:gap-y-4 border-b border-black lg:pb-8">
          <h1 className="lg:text-4xl text-neutral-800 uppercase tracking-tight">
            Identity & Profile Settings
          </h1>
          <h6 className="lg:text-sm text-neutral-600 uppercase tracking-tight lg:w-[50%]">
            Configure your profile here as well as manage comments, Ban, audit
            logs, and more...
          </h6>
        </div>

        <div className="flex justify-center items-center w-full border-t border-b border-black">
          <div className="flex justify-start items-start flex-col lg:gap-y-6 w-full border-r border-black lg:py-4 lg:pr-8">
            <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
              <h1 className="lg:text-3xl text-neutral-800 uppercase tracking-tight">
                {userType === "VIEWER" ? "Viewer" : "Author"} Profile
              </h1>
              <h6 className="lg:text-xs text-neutral-600 uppercase tracking-tight lg:w-full">
                Kindly never share your username with anyone
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col lg:gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start lg:gap-x-4 w-full lg:p-2">
                <div className="w-26 h-22 bg-black" />
                <div className="flex justify-start items-start flex-col lg:gap-y-2 w-full">
                  {userType === "VIEWER" && (
                    <span className="text-[10px] font-extrabold text-neutral-800 lowercase duration-200 cursor-pointer">
                      @{username}
                    </span>
                  )}
                  <p className="lg:text-[10px]">
                    Cached globally on Cloudflare edge. Synchronized with public
                    author identity tags.
                  </p>
                  <div className="flex justify-start items-center lg:gap-x-4 w-full">
                    <button className="text-[10px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer">
                      Replace Profile Picture...
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

            <div className="flex justify-start items-start flex-col lg:gap-y-4 w-full border border-red-600 bg-red-100">
              <div className="flex justify-start items-start lg:gap-x-4 w-full lg:p-2">
                <div className="flex justify-start items-start flex-col lg:gap-y-2 w-full">
                  <h6 className="lg:text-xl font-semibold uppercase tracking-tighter">
                    Erase Memory
                  </h6>
                  <p className="lg:text-[10px]">
                    Deleting your account will result in permanent deletion from
                    our servers and database. Account never get retrieved after
                    getting removed.
                  </p>
                  <div className="flex justify-start items-center lg:gap-x-4 w-full">
                    <span className="flex items-center gap-x-1 text-[10px] font-semibold text-black bg-red-600 hover:bg-white p-1 border border-black uppercase duration-200 cursor-pointer">
                      <Trash className="text-black w-3 h-3" /> Delete my Account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col lg:gap-y-6 w-full lg:py-4 lg:pl-8">
            <div className="flex justify-start items-start w-full flex-col lg:gap-y-2">
              <h1 className="lg:text-3xl text-neutral-800 uppercase tracking-tight">
                Edit Basic Details
              </h1>
              <h6 className="lg:text-xs text-neutral-600 uppercase tracking-tight lg:w-full">
                Update your first and last name
              </h6>
            </div>

            <div className="flex justify-start items-start flex-col lg:gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start lg:gap-x-4 w-full lg:p-2">
                <div className="flex justify-start items-start flex-col lg:gap-y-2 w-full">
                  <div className="flex justify-start items-start lg:gap-x-4 w-full lg:p-2">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        First Name
                      </label>
                      <input
                        value={firstName!}
                        // onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-neutral-50 border border-black px-3.5 py-1.5 text-[10px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                        Last Name
                      </label>
                      <input
                        value={lastName!}
                        // onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-neutral-50 border border-black px-3.5 py-1.5 text-[10px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start items-center lg:gap-x-4 w-full lg:mt-2">
                    <span className="text-[10px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer">
                      Save Changes
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-800 bg-white p-1 border border-black uppercase hover:bg-neutral-50 duration-200 cursor-pointer">
                      Cancel
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-start flex-col lg:gap-y-4 w-full border border-black bg-neutral-100">
              <div className="flex justify-start items-start lg:gap-x-4 w-full lg:p-2">
                <div className="flex justify-start items-start flex-col lg:gap-y-2 w-full">
                  <h6 className="lg:text-xl font-semibold uppercase tracking-tighter">
                    View All Comments
                  </h6>
                  <p className="lg:text-[10px]">
                    View all the comments you posted over pages of the Delciae.
                  </p>
                  <div className="flex justify-start items-center lg:gap-x-4 w-full">
                    <span className="flex items-center gap-x-1 text-[10px] font-semibold text-black hover:bg-white p-1 border border-black uppercase bg-[#45FF17] duration-200 cursor-pointer">
                      <MessageCircle className="text-black w-3 h-3" /> See My
                      comments
                    </span>
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
