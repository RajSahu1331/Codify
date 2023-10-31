import React, { useRef,useState } from 'react';

const FileUploadButton = ({ onFileSelected }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelected(file);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div className="mt-2 mb-3">
          <h6>Selected File {selectedFile.name}</h6>
        </div>
      )}
    </div>

  );
};

export default FileUploadButton;
