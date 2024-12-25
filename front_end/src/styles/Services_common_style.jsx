import styled from "styled-components";

const ServiceStyle = styled.nav`
  /* Container */
  .container {
    max-width: 1280px; /* max-w-screen-2xl */
    margin: 0 auto; /* mx-auto */
    padding: 0 24px; /* px-6 */
    padding-top: 12px; /* py-3 */
    padding-bottom: 12px;
  }
  @media (min-width: 768px) {
    .container {
      padding-left: 160px; /* md:px-40 */
      padding-right: 160px;
    }
  }

  /* Flex Center */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Border Box */
  .border-box {
    border-width: 2px;
    border-style: dashed;
    padding: 8px 16px; /* px-4 py-2 */
    border-color: #6366F1; /* indigo-400 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06); /* shadow-lg */
  }
  @media (min-width: 768px) {
    .border-box {
      padding: 32px; /* md:px-8 md:py-8 */
    }
  }

  /* Title */
  .title {
    font-size: 1.875rem; /* text-3xl */
    font-weight: bold; /* font-bold */
    text-align: center; /* text-center */
    margin-bottom: 16px; /* mb-4 */
  }

  /* File Input Container */
  .file-input-container {
    display: flex;
    flex-direction: column; /* float-col */
    align-items: center;
    gap: 16px; /* space-y-4 */
  }

  /* Hidden */
  .hidden {
    display: none;
  }
  /* File Label */
  .file-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px; /* px-4 py-6 */
    background-color: #F3F4F6; /* bg-gray-100 */
    color: #4B5563; /* text-gray-700 */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06); /* shadow-lg */
    border-color: #93C5FD; /* border-blue-300 */
    transition: background-color 0.3s;
    font-size: 1.25rem; /* Increased font size */
  }

  .file-label:hover {
    background-color: #93C5FD; /* hover:bg-blue-300 */
  }

  /* Convert Button */
  .convert-button {
    /* Add any additional styling for the button here */
  }

  /* At the time of File Downloaded Successfully ar error ocuure*/
  .text-center {
    text-align: center;
  }
  
  .text-green-500 {
    color: #34d399; /* Replace with desired shade of green */
    font-size: 18px;
  }
  
  .text-red-500 {
    color: #ef4444; /* Replace with desired shade of red */
    font-size: 18px;
  }
  `;

export default ServiceStyle;