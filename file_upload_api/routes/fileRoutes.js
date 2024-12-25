const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/fileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route for convert Docx to Pdf
router.post('/convert_docx_to_pdf', upload.single('file'), pdfController.convertDocxToPdf);

// Route for convert Pdf to Docx
router.post('/convert_pdf_to_docx', upload.single('file'), pdfController.convertPdfToDocx);

// Route for Compress the Pdf File
router.post('/compress_pdf', upload.single('file'), pdfController.compressPdfFile);

// Route for Convert the Pdf to image File
router.post('/convert_pdf_to_image', upload.single('file'), pdfController.convertPdfToImageFile);

// Route for Convert the Images to Pdf File
router.post('/convert_image_to_pdf', upload.array('images', 20), pdfController.convertImageToPdfFile);

// Route for Convert PPTX To Pdf File
router.post('/convert_pptx_to_pdf', upload.single('file'), pdfController.convertPptxToPdfFile);

// Route for Convert PDF To PPTX File
router.post('/convert_pdf_to_pptx', upload.single('file'), pdfController.convertPdfToPptxFile);

// Route for Combine the Pdf File
router.post('/combine_pdf', upload.array('file', 20), pdfController.combinePdfFile);


// Contact Us Form
router.post('/contactUsForm', (req, res, next) => {
    const formData = req.body;
    try{
        pdfController.contactUsForm(formData);

        // Send a response back to the client
        res.status(200).json({ message: 'Thank You For Contact Us' });
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;
