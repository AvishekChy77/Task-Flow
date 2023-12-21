import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <div className="font-Poppins flex flex-col min-h-screen">
        <div className="container flex-1 px-3 relative mx-auto grow">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Root;
