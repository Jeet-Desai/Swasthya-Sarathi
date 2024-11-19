import Hero from "../components/Hero/Hero";
import Hero1 from "../components/Hero/Hero1";
import AdminHome from "./AdminDashboard/AdminHome";

const Home = () => {
  return (
    <>
      <AdminHome/>
      {/*hero section*/}
      <Hero />

      {/*hero1 section*/}
      <Hero1 />
    </>
  );
};

export default Home;
