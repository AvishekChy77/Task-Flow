import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="w-full rounded-lg h-[250px] sm:h-[300px] md:h-[500px] bg-cover"
      style={{ backgroundImage: "url(https://i.ibb.co/3z4S09y/adk.png)" }}
    >
      <Link
        to="/dashboard/manageTask"
        className=" absolute top-[200px] sm:top-[250px] md:top-[350px] left-[5%] btn hover:bg-black hover:text-white bg-white text-blue-500"
      >
        <button>Let's Explore</button>
      </Link>
    </div>
  );
};

export default Banner;
