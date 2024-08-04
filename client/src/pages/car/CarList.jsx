import "./carList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import useFetch from "../../hooks/useFetch";

const CarList = () => {
  const { data, loading, error, reFetch } = useFetch(`/cars`);
  console.log(data);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <>
                {data.map((car) => (
                  <div className="carItem" key={car._id}>
                    <img
                      src={car.photos && car.photos.length > 0 ? car.photos[0] : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                      alt={car.name}
                      className="carImg"
                    />
                    <div className="carDetails">
                      <h1 className="carTitle">{car.model}</h1>
                      <span className="carBrand">{car.make}</span>
                      <span className="carFeatures">{car.year}</span>
                      <span className="carPrice">${car.price_per_day}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarList;
