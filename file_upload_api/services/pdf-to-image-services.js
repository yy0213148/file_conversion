const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFToImagesJob,
    ExportPDFToImagesTargetFormat,
    ExportPDFToImagesOutputType,
    ExportPDFToImagesParams,
    ExportPDFToImagesResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// To get the page count
const getPdfPageCount = async (filePath) => {
    try {
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        return pdfDoc.getPageCount();
    } catch (error) {
        console.error('Error reading or parsing PDF file:', error.message);
        return -1;  // Indicating an error occurred
    }
};

const createOutputFilePath = (fileOriginalName, pageCount) => {
    const filePath = 'output/ExportPDFToImage/';
    const date = new Date();
    //const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}-${('0' + date.getSeconds()).slice(-2)}`;
    const fileNameWithoutExt = path.parse(fileOriginalName).name;
    fs.mkdirSync(filePath, { recursive: true });
    if(pageCount == 1){
        return `${filePath}${fileNameWithoutExt}.jpg`;
    } else {
        return `${filePath}${fileNameWithoutExt}.zip`;
    }
    };

/**
 * This sample illustrates how to create a PDF file from a DOCX file.
 */

exports.convertPdfToImage = async (filePath, fileOriginalName) => {
    let readStream;
    let params;
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates an asset(s) from source file(s) and upload
        readStream = fs.createReadStream(filePath);
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF
        });
        //console.log(filePath);return false;
        const pageCount = await getPdfPageCount(filePath);
        // console.log(pageCount);return false;
        // Create parameters for the job
        if(pageCount === 1){
            params = new ExportPDFToImagesParams({
                targetFormat: ExportPDFToImagesTargetFormat.JPEG,
                outputType: ExportPDFToImagesOutputType.LIST_OF_PAGE_IMAGES
            });
        } else {
            params = new ExportPDFToImagesParams({
                targetFormat: ExportPDFToImagesTargetFormat.JPEG,
                outputType: ExportPDFToImagesOutputType.ZIP_OF_PAGE_IMAGES
            });
        }
        
        // Creates a new job instance
        const job = new ExportPDFToImagesJob({inputAsset, params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFToImagesResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.assets;
        const streamAsset = await pdfServices.getContent({asset: resultAsset[0]});

        // Creates an output stream and copy stream asset's content to it
        const outputFilePath = createOutputFilePath(fileOriginalName, pageCount);
        const outputStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(outputStream);

        return new Promise((resolve, reject) => {
            outputStream.on('finish', () => resolve(outputFilePath));
            outputStream.on('error', reject);
        });
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.log("Exception encountered while executing operation", err);
        } else {
            console.log("Exception encountered while executing operation", err);
        }
    } finally {
        readStream?.destroy();
    }
};
