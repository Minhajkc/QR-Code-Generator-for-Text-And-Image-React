import { useState, useRef } from "react";
import axios from "axios";
import QRCode from 'react-qr-code';




function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [qrData, setQrData] = useState(null);
  const qrRef = useRef(null);


  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cloudName = "dvwmsljna"
    const uploadPreset = "hkvzzqf8"
    if (selectedImages.length === 0) {
      console.log("No images selected.");
      return;
    }
  
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
      formData.append("upload_preset",uploadPreset); // Replace with your Cloudinary upload preset
    });
  
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Images uploaded successfully:", response.data);
      const imageUrl = response.data.secure_url;
      console.log('Image URL:', imageUrl);
      setQrData(imageUrl);
  
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  
    setSelectedImages([]); 
  };

  const downloadQRCodeimage = () => {
    console.log('innnnn');
    const qrCodeElement = qrRef.current;
    if (!qrCodeElement){
        console.log('noqrelement');
        return
    } 

    const svg = qrCodeElement.getElementsByTagName('svg')[0];
    if (!svg){
        console.log('no svg');
        return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'QRCode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  
  return (
    <div className="maindiv2">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
       

        <h1 className="text-3xl font-bold text-center mb-4">Image QR Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType={"multipart/form-data"}>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple 
            onChange={handleImageChange}
            className="custom-file-input"
          />
          <button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600">Generate QR</button>
        </form>
        
        {qrData && (
          <div className="flex justify-center">
            <div className="text-center shadow-lg" ref={qrRef}>
              <QRCode value={`${qrData}`} className="text-center" size={128} />
           
            </div>
            <button className="nextbutton" onClick={downloadQRCodeimage} >Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;