const Footer = () => {
  return (
    <div className="flex justify-between items-center w-full lg:px-8 lg:py-4 bg-neutral-100 font-jetbrains border-t border-black absolute bottom-0">
      <div className="flex justify-start items-center lg:gap-x-2 w-full">
        <h6 className="lg:text-xs font-semibold text-neutral-800">
          SERVER_REGION: us-west-oregon.prd
        </h6>

        <span className="text-neutral-300">|</span>

        <h6 className="lg:text-xs font-semibold text-neutral-800 uppercase">
          Status: OK
        </h6>
      </div>

      <div className="flex justify-end items-center w-full">
        <h6 className="lg:text-xs font-semibold text-neutral-800 uppercase">
          Groven &copy; 2026
        </h6>
      </div>
    </div>
  );
};

export default Footer;
