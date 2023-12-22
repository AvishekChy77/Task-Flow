import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="w-full rounded-lg h-[300px] md:h-[500px] bg-cover"
      style={{ backgroundImage: "url(https://i.ibb.co/3z4S09y/adk.png)" }}
    >
      <Link
        to="/"
        className=" absolute top-[55%] left-[5%] btn hover:bg-black hover:text-white bg-white text-blue-500"
      >
        <button>Let's Explore</button>
      </Link>
    </div>
  );
};

export default Banner;
