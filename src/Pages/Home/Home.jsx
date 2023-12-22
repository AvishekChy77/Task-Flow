import { Helmet } from "react-helmet-async";
import Banner from "./banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskFlow | Home</title>
      </Helmet>
      <div className=" space-y-16 mb-16">
        <Banner />
      </div>
    </div>
  );
};

export default Home;
