import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import UploadSection from '../components/UploadSection';
import ImageCard from '../components/ImageCard';
import CalendarSchedule from '../components/CalendarSchedule';
import FloatingActionButton from '../components/FloatingActionButton';

const CalendarPage = () => {
  const [mediaPreview, setMediaPreview] = useState(null); // State for uploaded file preview
  const [postText, setPostText] = useState(''); // State for user input
  const [postContent, setPostContent] = useState(null); // State for posted content

  const handleMediaUpload = (file) => {
    if (file) {
      const previewURL = URL.createObjectURL(file); // Generate temporary URL for the file
      setMediaPreview(previewURL); // Set media preview URL
    }
  };

  const handlePost = () => {
    // Save the current post text and media for rendering
    setPostContent({ text: postText, media: mediaPreview });
    // Reset input fields
    setPostText('');
    setMediaPreview(null);
  };

  return (
    <div className="relative min-h-screen flex gap-0 bg-white-100">
      {/* Sidebar */}
      <Sidebar className="lg:w-1/5 w-full hidden lg:block" />
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Input Section */}
          <div className="bg-white p-4 sm:p-6 shadow rounded">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-3 border rounded resize-none mb-4 text-base sm:text-lg"
              rows="3"
            ></textarea>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <UploadSection onMediaUpload={handleMediaUpload} />
              <button
                onClick={handlePost}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-base sm:text-lg"
              >
                Post
              </button>
            </div>
          </div>

          {/* Calendar Schedule */}
          <div className="flex-1">
            <CalendarSchedule />
          </div>

          {/* Display Posted Content */}
          {postContent && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white p-4 shadow rounded w-full sm:w-2/3">
                {postContent.text && (
                  <p className="text-base sm:text-lg lg:text-xl mb-4">
                    {postContent.text}
                  </p>
                )}
                <ImageCard mediaPreview={postContent.media} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Floating Action Button */}
      <FloatingActionButton className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8" />
    </div>
  );
};

export default CalendarPage;
