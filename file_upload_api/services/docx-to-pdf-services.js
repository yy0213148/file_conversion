const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CreatePDFJob,
    CreatePDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');
const path = require('path');

const createOutputFilePath = (fileOriginalName) => {
    const filePath = 'output/CreatePDFFromDOCX/';
    const date = new Date();
    //const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}-${('0' + date.getSeconds()).slice(-2)}`;
    const fileNameWithoutExt = path.parse(fileOriginalName).name;
    fs.mkdirSync(filePath, { recursive: true });
    return `${filePath}${fileNameWithoutExt}.pdf`;
};

/**
 * This sample illustrates how to create a PDF file from a DOCX file.
 */

exports.convertToPdf = async (filePath, fileOriginalName) => {
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({ credentials });

        // Creates an asset(s) from source file(s) and upload
        const readStream = fs.createReadStream(filePath);
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.DOCX
        });

        // Creates a new job instance
        const job = new CreatePDFJob({ inputAsset });

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({ job });
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CreatePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({ asset: resultAsset });

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = createOutputFilePath(fileOriginalName);
        const outputStream = fs.createWriteStream(outputFilePath);
        streamAsset.readStream.pipe(outputStream);

        return new Promise((resolve, reject) => {
            outputStream.on('finish', () => resolve(outputFilePath));
            outputStream.on('error', reject);
        });
    } catch (err) {
        if (err instanceof SDKError || err instanceof ServiceUsageError || err instanceof ServiceApiError) {
            console.error('Adobe PDF Services SDK error:', err);
        } else {
            console.error('General error:', err);
        }
        throw err;
    }
};