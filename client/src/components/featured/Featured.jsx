import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Hunza,Naran,Swat"
  );

  return (
    <div className="featured">
      {loading ? (
        <div class="loader"></div>
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/d5/1c/94/passu-valley-hunza-valley.jpg?w=800&h=-1&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Hunza</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://historypak.com/wp-content/uploads/2014/03/Narran-Valley.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Naran</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/67/88/93/swat-valley.jpg?w=1200&h=-1&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Swat</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
