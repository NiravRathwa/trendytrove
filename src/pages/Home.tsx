import React from "react";
import Loader from "../components/Loader";
import AdminNavbar from "../components/AdminNavbar";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import SwiperComponent from "components/SwiperComponent";
import Navbar from "components/Navbar";
type Props = {};

const Home = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="">
      {/* {user?.role === "admin" && <AdminNavbar />} */}
      <Navbar />
      <SwiperComponent />
    </div>
  );
};

export default Home;
