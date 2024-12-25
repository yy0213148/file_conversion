The File Conversion Tool is a web-based application designed to convert files between various formats. It features a React-based frontend for a user-friendly interface and an Express-powered backend for handling file processing and conversions.

**Features**
Frontend:
Built with React and styled using Tailwind CSS and Bootstrap.
Interactive UI for uploading files and selecting conversion options.
Integration with React Router for seamless navigation.

**Backend**
Powered by Express.js for API handling.
Supports file uploads using Multer.
File conversion capabilities using libraries like:
PDFLib and PDFKit for PDF manipulation.
Sharp for image processing.
@adobe/pdfservices-node-sdk for advanced PDF operations.
Secure communication with CORS and JWT authentication.
Database integration using MongoDB and Mongoose.

**Installation**
**Prerequisites**
Node.js (version 16 or later recommended
MongoDB instance (local or cloud)

**Steps**
1.Clone this repository:
git clone https://github.com/your-username/file-conversion-tool.git
cd file-conversion-tool

**Frontend Setup**
Navigate to the frontend directory:
2.cd front_end
3.npm install
4.npm run dev

**Backend Setup**
5.Navigate to the backend directory:
cd backend

6.Install dependencies:
npm install

7.Set up environment variables
Create a .env file in the backend directory with the following:
PORT = 3000

#Adobe Pdf Services Credentials
PDF_SERVICES_CLIENT_ID =  Your Adobe Client id
PDF_SERVICES_CLIENT_SECRET =  Your Adobe client secret 

# DataBase
MONGO_URL = 'Add your MongoDB Database URL'(Optional)


8.Start the backend server:
npm start



