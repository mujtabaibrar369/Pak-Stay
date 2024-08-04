import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(null); // Add this line
  const { data: userData, loading: userLoading } =
    useFetch("/users/countUsers");
  const { data: bookingsData, loading: bookingsLoading } = useFetch(
    "/booking/countBookings"
  ); // Add this line

  useEffect(() => {
    if (!userLoading) {
      setUser(userData);
    }
    if (!bookingsLoading) {
      // Add this block
      setBookings(bookingsData);
    }
  }, [userLoading, bookingsLoading, userData, bookingsData]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" count={userData} />
          <Widget type="bookings" count={bookingsData} /> {/* Add this line */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
