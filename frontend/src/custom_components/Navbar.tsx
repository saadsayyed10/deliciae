import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full lg:px-8 px-6 lg:py-4 py-2 bg-neutral-100 font-jetbrains border-b border-black">
      <div className="flex justify-start items-start gap-x-2 w-full">
        <h1
          onClick={() => navigate("/")}
          className="lg:text-3xl text-xl text-neutral-800 tracking-tighter cursor-pointer"
        >
          Deliciae
        </h1>
        <span className="text-[8px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black">
          v0.9.4
        </span>
      </div>

      <div className="flex justify-end items-end w-full">
        <button
          className={
            "rounded-none border border-black bg-[#45FF17] cursor-pointer p-1"
          }
          onClick={() => navigate("/settings")}
        >
          <Menu size={18} color="black" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
