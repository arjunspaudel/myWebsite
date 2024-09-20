import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import { jsPDF } from "jspdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFSignature = ({ isOpen, onClose }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const pdfCanvasRef = useRef(null);
  const imageCanvasRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  const [mode, setMode] = useState('view'); // 'view' or 'adjust'
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const pdfContainerRef = useRef(null);
  const [pdfMode, setPdfMode] = useState('adjust');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDocument(pdf);
      setNumPages(pdf.numPages);
      setCurrentPage(1);
    }
  };

  const renderPage = async (pageNum) => {
    if (pdfDocument && pdfCanvasRef.current) {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = pdfCanvasRef.current;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      await page.render(renderContext).promise;

      // Update image canvas size
      if (imageCanvasRef.current) {
        imageCanvasRef.current.width = canvas.width;
        imageCanvasRef.current.height = canvas.height;
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = pdfCanvasRef.current.width / 2;
          const maxHeight = pdfCanvasRef.current.height / 2;
          let newWidth = img.width;
          let newHeight = img.height;
          
          if (newWidth > maxWidth) {
            newHeight = (maxWidth / newWidth) * newHeight;
            newWidth = maxWidth;
          }
          if (newHeight > maxHeight) {
            newWidth = (maxHeight / newHeight) * newWidth;
            newHeight = maxHeight;
          }
          
          setSignatureImage(img);
          setImageSize({ width: newWidth, height: newHeight });
          setImagePosition({
            x: (pdfCanvasRef.current.width - newWidth) / 2,
            y: (pdfCanvasRef.current.height - newHeight) / 2
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const isPointInImage = (x, y) => {
    return (
      x >= imagePosition.x &&
      x <= imagePosition.x + imageSize.width &&
      y >= imagePosition.y &&
      y <= imagePosition.y + imageSize.height
    );
  };

  const handleMouseDown = (e) => {
    if (mode === 'adjust' && signatureImage) {
      const rect = imageCanvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isPointInImage(x, y)) {
        setIsDragging(true);
        setDragStart({
          x: x - imagePosition.x,
          y: y - imagePosition.y
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    if (mode === 'adjust' && isDragging) {
      const rect = imageCanvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setImagePosition({
        x: x - dragStart.x,
        y: y - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (mode === 'adjust') {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseDown(touch);
    }
  };

  const handleTouchMove = (e) => {
    if (mode === 'adjust') {
      e.preventDefault();
      const touch = e.touches[0];
      handleMouseMove(touch);
    }
  };

  const handleTouchEnd = (e) => {
    if (mode === 'adjust') {
      e.preventDefault();
      handleMouseUp();
    }
  };

  const drawImage = () => {
    if (signatureImage && imageCanvasRef.current) {
      const ctx = imageCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, imageCanvasRef.current.width, imageCanvasRef.current.height);
      
      ctx.save();
      ctx.translate(imagePosition.x + imageSize.width / 2, imagePosition.y + imageSize.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        signatureImage,
        -imageSize.width / 2,
        -imageSize.height / 2,
        imageSize.width,
        imageSize.height
      );
      ctx.restore();
    }
  };

  const handleWheel = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const newScale = scale - e.deltaY * 0.01;
      setScale(Math.min(Math.max(0.5, newScale), 3));
    }
  };

  useEffect(() => {
    if (pdfDocument) {
      renderPage(currentPage);
    }
  }, [pdfDocument, currentPage, scale]);

  useEffect(() => {
    if (pdfCanvasRef.current && imageCanvasRef.current) {
      imageCanvasRef.current.width = pdfCanvasRef.current.width;
      imageCanvasRef.current.height = pdfCanvasRef.current.height;
    }
    drawImage();
  }, [signatureImage, imagePosition, imageSize, rotation, scale]);

  useEffect(() => {
    const container = pdfCanvasRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [scale]);

  const downloadPDF = async () => {
    if (pdfDocument && signatureImage) {
      const pdf = new jsPDF();
      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        };
        await page.render(renderContext).promise;
        
        if (i === currentPage) {
          const ctx = canvas.getContext('2d');
          ctx.save();
          ctx.translate(imagePosition.x + imageSize.width / 2, imagePosition.y + imageSize.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(
            signatureImage,
            -imageSize.width / 2,
            -imageSize.height / 2,
            imageSize.width,
            imageSize.height
          );
          ctx.restore();
        }
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        
        if (i < numPages) {
          pdf.addPage();
        }
      }
      pdf.save("signed_document.pdf");
    }
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const setZoomLevel = (level) => {
    setScale(level);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full h-full md:w-3/4 md:h-3/4 flex flex-col overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold p-4 bg-gray-100">PDF Signature Tool</h2>
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          <div 
            ref={pdfContainerRef}
            className="w-full md:w-3/4 h-1/2 md:h-full relative overflow-auto"
            style={{ touchAction: 'auto' }}
          >
            {!pdfDocument && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center p-4">
                <div>
                  <p className="mb-2">1. Select a PDF file to sign.</p>
                  <p className="mb-2">2. Adjust the pdf to place the signature.</p>
                  <p className="mb-2">3. Upload your signature image.</p>
                  <p className="mb-2">4. Position and adjust your signature.</p>
                  <p>5. Download your signed PDF.</p>
                </div>
              </div>
            )}
            <canvas 
              ref={pdfCanvasRef} 
              className="absolute top-0 left-0"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            />
            {signatureImage && (
              <canvas 
                ref={imageCanvasRef} 
                className="absolute top-0 left-0 pointer-events-auto" 
                style={{
                  width: pdfCanvasRef.current ? pdfCanvasRef.current.width : '100%',
                  height: pdfCanvasRef.current ? pdfCanvasRef.current.height : '100%',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            )}
            {mode === 'adjust' && (
              <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600 bg-white bg-opacity-75 p-2 rounded">
                Tap and drag to move the signature. Pinch to resize.
              </div>
            )}
          </div>
          <div className="w-full md:w-1/4 p-4 flex flex-col space-y-4 overflow-y-auto">
            <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full" />
            {pdfDocument && (
              <>
                <div className="flex justify-between items-center">
                  <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-blue-500 text-white rounded">Prev</button>
                  <span>Page {currentPage} of {numPages}</span>
                  <button onClick={nextPage} disabled={currentPage === numPages} className="px-3 py-1 bg-blue-500 text-white rounded">Next</button>
                </div>
                <div className="flex justify-between">
                  <button onClick={zoomOut} className="px-3 py-1 bg-green-500 text-white rounded">-</button>
                  <span>{Math.round(scale * 100)}%</span>
                  <button onClick={zoomIn} className="px-3 py-1 bg-green-500 text-white rounded">+</button>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                <button onClick={downloadPDF} className="w-full px-4 py-2 bg-green-500 text-white rounded">Download Signed PDF</button>
              </>
            )}
          </div>
        </div>
        {signatureImage && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setMode(mode === 'view' ? 'adjust' : 'view')}
              className={`px-3 py-1 rounded ${
                mode === 'adjust' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {mode === 'view' ? 'Adjust Signature' : 'Adjust PDF'}
            </button>
          </div>
        )}
        <button onClick={onClose} className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded m-4">Close</button>
      </div>
    </div>
  );
};

export default PDFSignature;
