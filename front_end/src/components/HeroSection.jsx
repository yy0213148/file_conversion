import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Added padding for better spacing on small screens */

  @media (max-width: 480px) {
    margin-top: 50px; /* Add margin to push the content down on mobile screens */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 100px;

  @media (max-width: 768px) {
    padding: 50px; /* Adjust padding for tablets */
  }
  
  @media (max-width: 480px) {
    padding: 20px; /* Adjust padding for mobile phones */
  }
  
  h1 {
    font-family: 'Arial', sans-serif;
    font-size: 30px;
    margin: 10px 0;
    line-height: 1.5;

    &:first-of-type {
      margin-bottom: 20px;
    }

    @media (max-width: 768px) {
      font-size: 24px; /* Adjust font size for tablets */
    }

    @media (max-width: 480px) {
      font-size: 20px; /* Adjust font size for mobile phones */
      margin: 5px 0; /* Adjust margins for better spacing on mobile */
    }
  }
`;

const MyComponent = () => {
  return (
    <Wrapper>
      <Container>
        <h1><b>Every tool you need to work with PDFs in one place</b></h1>
        <h1>Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Compress, convert, rotate, unlock, and watermark PDFs with just a few clicks.</h1>
      </Container>
    </Wrapper>
  );
};

export default MyComponent;
