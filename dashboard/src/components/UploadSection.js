import React from 'react';

const UploadSection = ({ onMediaUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) onMediaUpload(file); // Trigger the callback with the selected file
  };

  return (
    <section className="bg-white p-6 shadow rounded">
      <label className="px-4 py-2 bg-purple-500 hover:bg-indigo-600 text-white rounded text-xl cursor-pointer">
        Browse Files
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </section>
  );
};

export default UploadSection;