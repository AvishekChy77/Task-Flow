import { Helmet } from "react-helmet-async";
import Benefits from "./Benefits";
import Banner from "./banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskFlow | Home</title>
      </Helmet>
      <div className=" space-y-16 mb-16">
        <Banner />
        <Benefits />
      </div>
    </div>
  );
};

export default Home;
