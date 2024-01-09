import React, { useState } from 'react';
import { useUser } from '../../UserContext';

const UploadArt = () => {
  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [prize, setPrize] = useState('');
  const [title, setTitle] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePrizeChange = (e) => {
    setPrize(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image) ;
    formData.append('prize', prize);
    formData.append('title', title);
    console.log(user)
    console.log("fdfsdf")

    formData.append('username', user.username);
    console.log(formData)
    console.log(formData)

    console.log(formData)


    fetch('http://localhost:80/upload.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Handle success or display error message
        
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  // Check if user is logged in and a username is given
  if (!user) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '200px',
      }}
    >
      <div style={{ marginTop: '100px' }}>
        <label htmlFor="image">Upload Art Image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="prize">Set Prize:</label>
        <input type="text" id="prize" name="prize" value={prize} onChange={handlePrizeChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
      </div>
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          background: 'blue',
          color: 'white',
          border: 'none',
        }}
      >
        Upload Art
      </button>
    </form>
  );
};

export default UploadArt;