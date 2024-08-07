import { useState } from "react";
import Chat from "../../components/chat/Chat";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import NearestProperties from "../../components/nearestProperties/nearestProperties";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import WeatherWidget from "../../components/weather/WeatherWidget";

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Properties near you</h1>
        <NearestProperties />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <div className="floatingWeatherWidget">
        <WeatherWidget /></div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
