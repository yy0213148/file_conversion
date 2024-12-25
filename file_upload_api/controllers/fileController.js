const docxToPdfService = require('../services/docx-to-pdf-services');
const pdfToDocsService = require('../services/pdf-to-docx-services');
const compressPdfService = require('../services/compress-pdf-services');
const convertPdfToImageService = require('../services/pdf-to-image-services');
const convertImageToPdfService = require('../services/image-to-pdf-services');
const convertPptxToPdfService = require('../services/pptx-to-pdf-services');
const convertPdfToPptxService = require('../services/pdf-to-pptx-services');

const combinePdfService = require('../services/combine-pdf-services');

const contactUs = require('../models/contactUsModel');
const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


const fs = require('fs');

// Convert the DOCX File To PDF
exports.convertDocxToPdf = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await docxToPdfService.convertToPdf(filePath, fileOriginalName);
        res.status(200).json({ message: 'PDF created successfully', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create PDF', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// Convert the PDF File To Docx
exports.convertPdfToDocx = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await pdfToDocsService.convertToDocx(filePath, fileOriginalName);
        res.status(200).json({ message: 'Docx created successfully', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create Docx', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// For Compress the PDF File
exports.compressPdfFile = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await compressPdfService.compressPdf(filePath, fileOriginalName);
        res.status(200).json({ message: 'PDF File successfully Compressed', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Compress PDF file', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// For Convert the PDF File To Image
exports.convertPdfToImageFile = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await convertPdfToImageService.convertPdfToImage(filePath, fileOriginalName);
        res.status(200).json({ message: 'PDF File successfully Converted', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Convert PDF file', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// For Convert the Image To Pdf
exports.convertImageToPdfFile = async (req, res) => {
    const files = req.files;

    if (!Array.isArray(files) || !files.every(file => file.path && typeof file.path === 'string')) {
        return res.status(400).send('Invalid image files');
    }

    const filePaths = files.map(file => file.path);

    try {
        const outputFilePath = await convertImageToPdfService.convertImagesToPDF(filePaths);
        res.status(200).json({ message: 'PDF File successfully Converted', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Convert PDF file', details: err.message });
    } finally {
        // Clean up uploaded files
        filePaths.forEach(filePath => {
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Failed to delete file: ${filePath}`, err);
            });
        });
    }
};

// For Convert the PPTX File To PDF
exports.convertPptxToPdfFile = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await convertPptxToPdfService.convertPptxToPdf(filePath, fileOriginalName);
        res.status(200).json({ message: 'PPTX File successfully Converted', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Convert PPTX file', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// For Convert the PDF File To PPTX
exports.convertPdfToPptxFile = async (req, res) => {
    const filePath = req.file.path;
    const fileOriginalName = req.file.originalname;

    try {
        const outputFilePath = await convertPdfToPptxService.convertPdfToPptx(filePath, fileOriginalName);
        res.status(200).json({ message: 'PDF File successfully Converted', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Convert PDF file', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};

// For Combine the PDF File
exports.combinePdfFile = async (req, res) => {
    const filePath = req.file;

    try {
        const outputFilePath = await combinePdfService.combinePdf(filePath);
        res.status(200).json({ message: 'PDF File successfully Combined', filePath: `/${outputFilePath}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to Combine PDF file', details: err.message });
    } finally {
        fs.unlinkSync(filePath); // Clean up uploaded file
    }
};


// For ContactUs Form
exports.contactUsForm = async (formDetails) => {
    try {
        const contactUsData = new contactUs(formDetails);
        await contactUsData.save();
    } catch (error) {
        console.error('Error in contactUsForm controller:', error);
        throw new Error('Database operation failed');
    } 
};
