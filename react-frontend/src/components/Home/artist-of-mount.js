import React, { useEffect, useState } from 'react';
import art_of_mount_img from '../../images/artOfMount.jpg';
import artist_of_mount_img from '../../images/artistOfMount.jpg';

const AofM = () => {
  const [artOfMountData, setArtOfMountData] = useState([]);
  const [artistOfMountData, setArtistOfMountData] = useState([]);
  const price = 50;
  
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
            <img src={art_of_mount_img} alt="Art of the Mount" />
            <div className="price">{price}$</div>
          </div>
          <div className="img__box">
            <img src={artist_of_mount_img} alt="Artist of Mount" />
            <div className="price">{price}$</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AofM;