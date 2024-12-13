import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Dashboard from "../Pages/Dashboard/Dashboard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <Dashboard />
      </div>
      <Footer />
    </>
  );
};

export default Home;
