import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskFlow | Home</title>
      </Helmet>
      <div className=" space-y-16 mb-16">
        <h2 className=" text-2xl">Welcome</h2>
      </div>
    </div>
  );
};

export default Home;
