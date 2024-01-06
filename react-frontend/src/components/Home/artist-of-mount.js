import React, { useEffect, useState } from 'react';
import art_of_mount_img from '../../images/artOfMount.jpg';
import artist_of_mount_img from '../../images/artistOfMount.jpg';
const AofM = () => {
  const [artOfMountData, setArtOfMountData] = useState([]);
  const [artistOfMountData, setArtistOfMountData] = useState([]);
  const [artPrice, setArtPrice] = useState(0);
  const [artistPrice, setArtistPrice] = useState(0);
    
  
  /*
   * Fetches data from http://localhost:80/month.php and filters it based on the values of "Title".
   * Sets the filtered data to state variables and sets the price from the filtered JSON data.
   *
   * @return {void}
  */
  const fetchData = async () => {
    try {
      // Fetch data from localhost:80/month.php
      const response = await fetch('http://localhost:80/month.php');
      const json = await response.json();

      // Filter the data based on the values of "Title"
      const artOfMountJson = json.filter((item) => item.Title === 'art');
      const artistOfMountJson = json.filter((item) => item.Title === 'artist');

      setArtOfMountData(artOfMountJson);
      setArtistOfMountData(artistOfMountJson);

      // Set the price from the filtered JSON data
      if (artOfMountJson.length > 0) {
        setArtPrice(artOfMountJson[0]?.price || 0);
      }
      
      if (artistOfMountJson.length > 0) {
        setArtistPrice(artistOfMountJson[0]?.price || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container aOfM">
      <div className="aOfM__sec">
        <div className="aOfM__header">
          <p>Art of the mount</p>
          <div className="vertical-line"></div>
          <p>Artist of mount</p>
        </div>
        <div className="aofM__imgs">
          <div className="img__box">
            <img src={artOfMountData[0]?.Art} alt="Art of the Mount" />
            <div className="price">{artPrice}$</div>
          </div>
          <div className="img__box">
            <img src={artistOfMountData[0]?.Artist} alt="Artist of Mount" />
            <div className="price">{artistPrice}$</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AofM;