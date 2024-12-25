import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Services from "./Services";
import WordToPdf from "./components/WordToPdf";
import ImageToPdf from "./components/ImageToPdf";
import PdfToWord from "./components/PdfToWord";
import PdfToImage from "./components/PdfToImage";
import PptxToPdf from "./components/PptxToPdf";
import PdfToPptx from "./components/PdfToPptx";
import CompressPdf from "./components/CompressPdf";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./adminComponents/auth/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Error from "./Error";
import GoToTop from "./components/GoToTop";

import AdminSide from "./adminComponents/auth/Login"; //For Admin Side


const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "#f3f0f0",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GoToTop />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/Admin_login" element={<AdminSide />} />

          <Route
            path="/"
            element={
              <>
                <Header />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/service" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/docx_to_pdf" element={<WordToPdf />} />
                  <Route path="/pdf_to_docx" element={<PdfToWord />} />
                  <Route path="/image_to_pdf" element={<ImageToPdf />} />
                  <Route path="/pdf_to_image" element={<PdfToImage />} />
                  <Route path="/pptx_to_pdf" element={<PptxToPdf />} />
                  <Route path="/pdf_to_pptx" element={<PdfToPptx />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
      <Routes>
      <Route path="/Admin_login" element={<Login />} />
      </Routes>
      
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docx_to_pdf" element={<WordToPdf />} />
          <Route path="/pdf_to_docx" element={<PdfToWord />} />
          <Route path="/image_to_pdf" element={<ImageToPdf />} />
          <Route path="/pdf_to_image" element={<PdfToImage />} />
          <Route path="/pptx_to_pdf" element={<PptxToPdf />} />
          <Route path="/pdf_to_pptx" element={<PdfToPptx />} />
          <Route path="/compress_pdf" element={<CompressPdf />} />
        </Routes>

        <Footer />
      </BrowserRouter>


    </ThemeProvider>
  );
};

export default App;
