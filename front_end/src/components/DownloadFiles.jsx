import React from 'react';
import axios from 'axios';


const DownloadFiles = async (filePath) => {
    try {
      // Step 2: Download the file
      const response = await axios.get(`http://localhost:3000${filePath}`, {
        responseType: 'blob', // Important to specify blob response type
      });

      // Log the response to debug any issues
      console.log('Download Response:', response);

      // Create a URL for the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath.split('/').pop()); // Extract the filename from the file path
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
      setDownloadError('Error downloading the file. Please try again.');
    }
  };

export default DownloadFiles