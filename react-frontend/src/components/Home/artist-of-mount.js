import React, { useEffect, useState } from "react";

const AofM = () => {
  const [artData, setArtData] = useState(null);
  const [artistData, setArtistData] = useState(null);
  const [artPrice, setArtPrice] = useState(0);
  const [artistPrice, setArtistPrice] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:80/month.php");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const art = jsonData.find((item) => item.art);
      const artist = jsonData.find((item) => item.artist);
      setArtData(art);
      setArtistData(artist);
      setArtPrice(art?.price || 0);
      setArtistPrice(artist?.price || 0);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container aOfM">
      <div className="aOfM__sec">
        <div className="aOfM__header">
          <p>Art of the Month</p>
          <div className="vertical-line"></div>
          <p>Artist of the Month</p>
        </div>
        <div className="aofM__imgs">
          <div className="img__box">
            {artData && (
              <>
                <img src={artData.art} alt="Art of the Month" />
                <div className="price">{artPrice}$</div>
              </>
            )}
          </div>
          <div className="img__box">
            {artistData && (
              <>
                <img src={artistData.artist} alt="Artist of the Month" />
                <div className="price">{artistPrice}$</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AofM;
