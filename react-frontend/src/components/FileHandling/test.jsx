import React from 'react';
import PdfViewer from '../FileHandling/pdf_viewer.jsx';

const PdfView = () => {
  const pdfUrl = '/sample.pdf';

  return (
    <div>
      <h1>PDF Viewer</h1>
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default PdfView;
