import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full lg:px-8 px-6 lg:py-4 py-2 bg-neutral-100 font-jetbrains border-b border-black">
      <div className="flex justify-start items-start gap-x-2 w-full">
        <h1 className="lg:text-3xl text-xl text-neutral-800 tracking-tighter">
          Deliciae
        </h1>
        <span className="text-[8px] font-semibold text-neutral-800 bg-[#45FF17] p-1 border border-black">
          v0.9.4
        </span>
      </div>

      <div className="flex justify-end items-end w-full">
        <Button
          variant={"ghost"}
          className={
            "rounded-none border border-black bg-[#45FF17] cursor-pointer"
          }
        >
          <Menu color="black" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
