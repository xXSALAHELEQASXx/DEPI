import React from 'react';
import { FaShareAlt, FaComment, FaHeart } from 'react-icons/fa';

const ImageCard = ({ mediaPreview }) => {
  return (
    <section className="bg-white p-6 shadow rounded mx-auto" style={{ width: '22rem' }}>
      <div className="mb-4">
        {mediaPreview ? (
          mediaPreview.includes('video') ? (
            <video
              src={mediaPreview}
              controls
              className="w-full h-full object-cover rounded shadow"
            ></video>
          ) : (
            <img
              src={mediaPreview}
              alt="Uploaded Media"
              className="w-full h-full object-cover rounded shadow"
            />
          )
        ) : (
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded shadow">
            <span className="text-gray-700 text-xl">Image Placeholder</span>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-2">
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-purple-600 text-black px-3 py-2 rounded text-base">
          <FaShareAlt size={18} />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-purple-600 text-black px-3 py-2 rounded text-base">
          <FaComment size={18} />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-purple-600 text-black px-3 py-2 rounded text-base">
          <FaHeart size={18} />
          <span>Like</span>
        </button>
      </div>
    </section>
  );
};

export default ImageCard;
