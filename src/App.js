import { useState, useRef } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import ImageUpload from './image';
import Headerfun from './headerpage';



function App() {
  const [valueQR, setValueQR] = useState('');
  const qrRef = useRef(null);
  const generate = (event) => {
    setValueQR(event.target.value);
  };


 

  const downloadQRCode = () => {
    const qrCodeElement = qrRef.current;
    if (!qrCodeElement) return;

    const svg = qrCodeElement.getElementsByTagName('svg')[0];
    if (!svg) return;

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
    <>
    <Headerfun/>
    <div className='maindiv'>
      <h1>Text QR Generator</h1>
      <form>
        <input type='text' placeholder='Enter your text...' value={valueQR} onChange={generate} />
      </form>
      <div ref={qrRef}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <QRCode value={valueQR||'fruitbasket.site'} size={128} style={{ margin: '20px' }} />
        </div>
      </div>
      <button onClick={downloadQRCode}>Download QR Code</button>

   <ImageUpload />
    </div>
    </>
    
  );
}

export default App;
