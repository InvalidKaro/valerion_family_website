import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import productStyle from '../../styles/product.module.css'
import textStyle from '../../styles/TextStyle.module.css'
import loginStyle from '../../styles/login.module.css';
import buttonStyle from '../../styles/button.module.css';
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

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
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
        const ImageUrl = 'http://localhost/' + data.url;
        const ext = ImageUrl.split('.').pop();
        const jsonString = JSON.stringify({ image: ImageUrl, ext: ext }); // Define jsonString here

        const urlWithParams = `http://localhost:80/waterMark.php?image=${(ImageUrl)}&ext=${ext}`;
        console.log(urlWithParams)
        fetch(urlWithParams, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonString,
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
    return (
      <div className={productStyle.container}>
        <p className={productStyle.p}>Oops! It looks like you're not logged in. Please log in to upload your art.</p>
        {/* You can consider rendering an error page or redirecting to a login page */}
      </div>
    );
  }
  // Add the logic for rendering the upload form when the user is logged in

  return (
    <div className={productStyle.container}>
      <div className={productStyle.formContainer}>
        <form
          className={loginStyle.form}
          onSubmit={handleSubmit}
          style={{
            flexDirection: 'column',
            maxWidth: '300px',
            margin: '200px',
          }}
        >
          <div style={{ marginTop: '100px' }}>
            <label className={loginStyle.label} htmlFor="image" >Upload Art Image:</label>
            <input className={loginStyle.input} type="file" id="image" name="image" accept="image/jpeg, image/png" onChange={handleImageChange} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="prize">Set Prize:</label>
            <input className={loginStyle.input} type="number" id="prize" name="prize" value={prize} onChange={handlePrizeChange} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="title">Set Title:</label>
            <input className={loginStyle.input} type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="description">Set Description:</label>
            <input className={loginStyle.input} type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label className={loginStyle.label} htmlFor="category">Category:</label>
            <div>
              <button
                onClick={() => handleCategoryChange('category1')}
                className={buttonStyle.tag_button}
              >
                Category 1
              </button>
              <button
                onClick={() => handleCategoryChange('category2')}
                className={buttonStyle.tag_button}
              >
                Category 2
              </button>
              <button
                onClick={() => handleCategoryChange('category3')}
                className={buttonStyle.tag_button}
              >
                Category 3
              </button>
              {/* Add more buttons as needed */}
            </div>
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
        <div className="imageContainer">
          {image && (
            <div className="imageDetails">
              <img src={URL.createObjectURL(image)} alt="Uploaded Art" style={{ maxWidth: '300px' }} />
              <h2>{title || 'Title Placeholder'}</h2>
              <p>{description || 'Description Placeholder'}</p>
              <p>Prize: {prize || 'Prize Placeholder'}</p>
              <p>Category: {category || 'Category Placeholder'}</p>
            </div>
          )}
        </div>
      </div>
    </div>  
  );
  
};

export default UploadArt;