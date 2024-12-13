import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Dashboard from "../Pages/Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <div className="bg-blue-500 mb-10">
        <Navbar />
      </div>
      <div className="min-h-screen flex justify-center items-center max-w-[1280x] mx-auto">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
};

export default Home;
