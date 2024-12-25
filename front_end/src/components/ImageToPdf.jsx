import React, { useState } from 'react';
import axios from 'axios';
import downloadFile from './DownloadFiles';
import ServiceStyle from '../styles/Services_common_style';

const ImageToPdf = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange=(e) =>{
    const fileName = Array.from(e.target.files || []);
    if (fileName.length > 0) {
      const checkFileExt = fileName.filter(file => !file.name.match(/\.(jpg|jpeg|png|gif)$/i));
      if (checkFileExt.length > 0) {
        setSelectedFile([]);
        setDownloadError("Error Occurred: You have not selected .png, .jpg, .jpeg files");
      } else {
        setSelectedFile(fileName);
        setDownloadError("");
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedFile.length === 0){
      setConvert("Please Selecte File");
      return;
    }
    
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append('images', selectedFile[i]);
    }
    try {
      // Make a POST request to the server to convert the file and get the response as a JSON
      const response = await axios.post('http://localhost:3000/api/convert_image_to_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle the response accordingly
      console.log(response.data);

      const filePath = response.data.filePath; // Adjust based on your response structure

      // Ensure the filePath is correct
      console.log('File Path:', filePath);

      if (filePath && filePath.startsWith('/')) {
        await downloadFile(filePath);

        // Reset the selected file and error state, and set a success message
        setSelectedFile([]);
        setDownloadError('');
        setConvert('File Downloaded Successfully');
      } else {
        setDownloadError('Invalid file path received from the server.');
      }
    } catch (error) {
      if(error.response && error.response.status==400){
        setDownloadError("Error Occured:",error.response.data.message);
      } else {
        setConvert("");
      }
    }
  }

  return (
    <ServiceStyle>
    <div className="container">
      <div className="flex-center">
        <div className="border-box">
          <h1 className="title">Image To PDF</h1>
          <p className="description">Convert your Image into PDF documents with incredible accuracy.</p>
        
        <div className="file-input-container">
          <input type="file" className="hidden" id="FileInput" accept="image/*" multiple onChange={handleFileChange}/>
          <label htmlFor="FileInput" className="file-label">
            {selectedFile.length > 0 ? `${selectedFile.length} files selected` : "Select File"}
          </label>
          <button disabled={selectedFile.length === 0} className="convert-button btn btn-danger" onClick={handleSubmit}>Convert File</button>
          {convert && (<div className='text-green-500 text-center'>{convert}</div>)}
          {downloadError && (<div className='text-red-500 text-center'>{downloadError}</div>)}
        </div>
        </div>
      </div>
    </div>
    </ServiceStyle>
  )
}

export default ImageToPdf