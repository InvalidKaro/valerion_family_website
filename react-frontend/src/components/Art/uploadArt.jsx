import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import textStyle from '../../styles/TextStyle.module.css';
import buttonStyle from '../../styles/button.module.css';
import dropDownStyle from '../../styles/dropDown.module.css';
import fileInputStyle from '../../styles/fileInput.module.css';
import loginStyle from '../../styles/login.module.css';
import productStyle from '../../styles/product.module.css';

const UploadArt = () => {
  const { user } = useUser();

  const [image, setImage] = useState(null);
  const [prize, setPrize] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [amount, setAmount] = useState('');
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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image) ;
    formData.append('prize', prize);
    formData.append('title', title);
    formData.append('amount', amount);
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
      <div className={productStyle.formContainer} style={{ display: 'flex' }}>

        <form
          className={loginStyle.form}
          onSubmit={handleSubmit}
          style={{
            width: 'fit-content',
            maxWidth: 'fit-content',
            display: 'grid',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginInline: '0',
          }}
        >
          <h1 className={textStyle.a_h1} style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 8vw, 5rem)' }}>Sell your art</h1>
          <div>
            <div className={fileInputStyle.fileInputContainer}>
              <label className={loginStyle.label} htmlFor="image" style={{ display: 'grid', position: 'relative' }}>
                Upload Art Image:
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpeg, image/png"
                  onChange={handleImageChange}
                  className={fileInputStyle.fileInput}
                />
                <span className={fileInputStyle.customFileButton}>Choose File</span>
              </label>
            </div>
          
          
            <label className={loginStyle.label} htmlFor="prize">Set Prize:</label>
            <input className={loginStyle.input} type="number" min="0" id="prize" name="prize" value={prize} onChange={handlePrizeChange} />
           
            <label className={loginStyle.label} htmlFor="prize">Set Amount:</label>
            <input className={loginStyle.input} type="number" min="0" id="amount" name="amount" value={amount} onChange={handleAmountChange} />
           
            <label className={loginStyle.label} htmlFor="title">Set Title:</label>
            <input className={loginStyle.input} type="text" id="title" name="title" value={title} onChange={handleTitleChange} />
          
          
            <label className={loginStyle.label} htmlFor="description">Set Description:</label>
            <input className={loginStyle.input} type="text" id="description" name="description" value={description} onChange={handleDescriptionChange} />
          
          
            <div className={dropDownStyle.dropdown}>
            <label className={loginStyle.label} htmlFor="category" style={{ marginTop: '1em', display: 'grid', position: 'relative' }}>
              Choose category:
              <select
                id="category"
                name="category"
                onChange={(e) => handleCategoryChange(e.target.value)}
                
                value={category}
                className={dropDownStyle.dropdown_select} // You can apply your buttonStyle here
              >
                <option value="" disabled selected>Select a category</option>

                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
          </div>
          <button
            type="submit"
            className={buttonStyle.glow_btn}
            style={{ marginTop: '25px', borderRadius: '25px', marginBottom: '25px', marginInline: 'auto' }}
            onClick={handleSubmit}
          >
            Upload Art
          </button>
        </form>
      {image && (
        <div className="imageContainer" style={{ margin: 'auto', marginLeft: '1vh', }}>
          <div className="imageDetails">
            <img src={URL.createObjectURL(image)} alt="Uploaded Art"  />
            <h2>{title || 'Title Placeholder'}</h2>
            <p>{description || 'Description Placeholder'}</p>
            <p>Prize: {prize || 'Prize Placeholder'}</p>
            <p>Category: {category || 'Category Placeholder'}</p>
          </div>
        </div>
      )}
    </div> 
    </div>
 
  );
  
};

export default UploadArt;