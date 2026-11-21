const Footer = () => {
  return (
    <div className="flex justify-between items-center w-full lg:px-8 px-6 lg:py-4 py-2 bg-neutral-100 font-jetbrains border-t border-black">
      <div className="flex justify-start items-center gap-x-1 w-full">
        <span className="lg:w-2 w-1 lg:h-2 h-1 rounded-[100%] bg-green-400" />
        <h6 className="text-xs font-semibold text-neutral-800">
          SERVER: us-west-oregon
        </h6>
      </div>

      <div className="flex justify-end items-center w-full">
        <h6 className="text-xs font-semibold text-neutral-800 uppercase">
          Groven &copy; 2026
        </h6>
      </div>
    </div>
  );
};

export default Footer;
