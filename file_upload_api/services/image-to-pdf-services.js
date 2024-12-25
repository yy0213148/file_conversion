const fs = require('fs');
const PDFDocument = require('pdfkit');
const { createCanvas, loadImage } = require('canvas');


const createOutputFilePath = () => {
    const filePath = 'output/CreatePDFFromImages/';
    const date = new Date();
    const dateString = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}-${('0' + date.getMinutes()).slice(-2)}-${('0' + date.getSeconds()).slice(-2)}`;
    // const fileNameWithoutExt = path.parse(fileOriginalName).name;
    fs.mkdirSync(filePath, { recursive: true });
    return `${filePath}${dateString}.pdf`;
};

exports.convertImagesToPDF = async (imagePaths) => {
    const doc = new PDFDocument();

    const outputFilePath = createOutputFilePath();
    const stream = fs.createWriteStream(outputFilePath);

    doc.pipe(stream);

    for (let i = 0; i < imagePaths.length; i++) {
        if (i > 0) {
            doc.addPage();
        }
        
        const canvas = createCanvas(600, 400);
        const ctx = canvas.getContext('2d');

        const image = await loadImage(imagePaths[i]);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const buffer = canvas.toBuffer('image/png');
        doc.image(buffer, 0, 0, { width: 500 });
    }

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(outputFilePath));
        stream.on('error', reject);
    });
}