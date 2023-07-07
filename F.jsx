import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function F() {
  const [imageUrls, setImageUrls] = useState([]);

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

    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
};
setTimeout(()=>{
    console.log(imageUrls)
},8000)

  return (
    <div>
      <h1>Upload Images</h1>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} multiple />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {imageUrls.length > 0 && (
        <div>
          <h2>Base64 URLs:</h2>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded ${index}`} style={{ width: '200px' }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default F;
