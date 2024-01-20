import React, { useState } from 'react';
import { useUser } from '../../UserContext';

const UploadArt = () => {
  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [prize, setPrize] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePrizeChange = (e) => {
    setPrize(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image) ;
    formData.append('prize', prize);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    console.log(user)
    console.log("fdfsdf")

    formData.append('username', user.username);
    console.log(formData)
    console.log(formData.get('description'))

    console.log(formData)


    fetch('http://localhost:80/upload.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Handle success or display error message
        setImageUrl(data.url)
        const url = 'http://localhost:80/Art/' + data.url;
        fetch('http://localhost:80/waterMark.php', {
          method: 'POST',
          body: imageUrl,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Handle success or display error message
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
          })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    
    
  };


  // Check if user is logged in and a username is given
  if (!user) {
    return null; // Render Error page or smt if user is not logged in
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
        <input type="file" id="image" name="image" accept="image/jpeg, image/png" onChange={handleImageChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="prize">Set Prize:</label>
        <input type="text" id="prize" name="prize" value={prize} onChange={handlePrizeChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
          {/* Add more options as needed */}
        </select>
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