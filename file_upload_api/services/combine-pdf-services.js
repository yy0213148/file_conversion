const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    CombinePDFJob,
    CombinePDFParams,
    CombinePDFResult,
    SDKError,
    ServiceUsageError,
    ServiceApiError
} = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const path = require('path');

const createOutputFilePath = () => {
    const filePath = 'output/CombinePDF/';
    const date = new Date();
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}-${('0' + date.getSeconds()).slice(-2)}`;
    // const fileNameWithoutExt = path.parse(fileOriginalName).name;
    fs.mkdirSync(filePath, { recursive: true });
    return `${filePath}combine${dateString}.pdf`;
};


/**
 * This sample illustrates how to combine multiple PDF files into a single PDF file.
 * <p>
 * Note that the SDK supports combining upto 20 files in one operation.
 */
exports.combinePdf = async (filePaths) => {
    let readStream1 = [];
    try {
        // Initial setup, create credentials instance
        const credentials = new ServicePrincipalCredentials({
            clientId: process.env.PDF_SERVICES_CLIENT_ID,
            clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET
        });

        // Creates a PDF Services instance
        const pdfServices = new PDFServices({credentials});

        // Creates assets from source files and upload
        const streamAssets = filePaths.map(filePath => {
            const readStream = fs.createReadStream(filePath);
            readStreams.push(readStream);
            return { readStream, mimeType: MimeType.PDF };
        });

        const inputAssets = await pdfServices.uploadAssets({ streamAssets });

        // Create parameters for the job
        const params = new CombinePDFParams();
        inputAssets.forEach(asset => params.addAsset(asset));

        // Create a new job instance
        const job = new CombinePDFJob({params});

        // Submit the job and get the job result
        const pollingURL = await pdfServices.submit({job});
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: CombinePDFResult
        });

        // Get content from the resulting asset(s)
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({asset: resultAsset});

        // Creates an output stream and copy result asset's content to it
        const outputFilePath = createOutputFilePath();
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
        readStreams.forEach(stream => stream.destroy());
    }
};