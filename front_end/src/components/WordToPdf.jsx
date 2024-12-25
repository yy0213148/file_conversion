import React, { useState } from 'react';
import axios from 'axios';
import downloadFile from './DownloadFiles';
import ServiceStyle from '../styles/Services_common_style';

const WordToPdf = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const fileName = e.target.files[0];
    if (fileName) {
      const nameParts = fileName.name.split('.');
      const extension = nameParts[nameParts.length - 1];
      if (extension === 'docx') {
        setSelectedFile(e.target.files[0]);
        setDownloadError('');
      } else {
        setSelectedFile(null);
        setDownloadError('Error Occured: You have not selected a Word file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setConvert('Please Select a File');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setLoading(true); // Show loader
    try {
      // Make a POST request to the server to convert the file and get the response as a JSON
      const response = await axios.post('http://localhost:3000/api/convert_docx_to_pdf', formData, {
        responseType: 'json',
      });

      const filePath = response.data.filePath; // Adjust based on your response structure

      // Ensure the filePath is correct
      console.log('File Path:', filePath);

      if (filePath && filePath.startsWith('/')) {
        await downloadFile(filePath);

        // Reset the selected file and error state, and set a success message
        setSelectedFile(null);
        setDownloadError('');
        setConvert('File Downloaded Successfully');
      } else {
        setDownloadError('Invalid file path received from the server.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDownloadError('Error Occured: ' + error.response.data.message);
      } else {
        setConvert('');
        console.error('Error during conversion:', error);
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  

  return (
    <ServiceStyle>
      <div className="container">
        <div className="flex-center">
          <div className="border-box">
            <h1 className="title">Word TO PDF</h1>
            <p className="description">Convert your WORD to PDF documents with incredible accuracy.</p>

            <div className="file-input-container">
              <input type="file" className="hidden" id="FileInput" onChange={handleFileChange} />
              <label htmlFor="FileInput" className="file-label">
                {selectedFile ? selectedFile.name : 'Select File'}
              </label>
              <button disabled={!selectedFile || loading} className="convert-button btn btn-danger" onClick={handleSubmit}>
                {loading ? 'Loading...' : 'Convert File'}
              </button>
              
              {convert && <div className="text-green-500 text-center">{convert}</div>}
              {downloadError && <div className="text-red-500 text-center">{downloadError}</div>}
            </div>
          </div>
        </div>
      </div>
    </ServiceStyle>
  );
};

export default WordToPdf;
