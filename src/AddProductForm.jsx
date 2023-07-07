import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const AddProductForm = () => {
  const [otherImages, setOtherImages] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    desc: '',
    price: 0,
    otherImages: [],
    name: '',
    quantity: 0,
    img: '',
    dateAdded: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      otherImages: otherImages,
    }));
  }, [otherImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.otherImages);
    try {
      const response = await axios.post(
        'http://localhost:8080/products/createproduct',
        formData
      );
      console.log(response.data);
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    const urls = await Promise.all(
      acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    setOtherImages((prevUrls) => [...prevUrls, ...urls]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="desc"
        name="desc"
        value={formData.desc}
        onChange={handleInputChange}
        required
      ></textarea>

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="otherImages">Other Images:</label>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} multiple />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      <label htmlFor="img">Image:</label>
      <input
        type="text"
        id="img"
        name="img"
        value={formData.img}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
        required
      />

      <br />
      <br />
      <label>Date Added:</label>
      <input
        type="date"
        name="dateAdded"
        id="dateAdded"
        value={formData.dateAdded}
        onChange={handleDateChange}
      />

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
