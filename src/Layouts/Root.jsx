import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <div className="font-Poppins flex flex-col min-h-screen">
        <div className="container flex-1 px-3 relative mx-auto grow">
          <Navbar />
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Root;
