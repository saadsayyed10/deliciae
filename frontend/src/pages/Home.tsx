import Footer from "@/custom_components/Footer";
import Navbar from "@/custom_components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-start items-start w-full lg:p-10 p-6 bg-white">
        Home
      </div>

      <Footer />
    </>
  );
};

export default Home;
