import React, { useState } from 'react';

const NewPost = () => {
  const [postMessage, setPostMessage] = useState('');
  const [error, setError] = useState(null);

  const handlePostSubmit = async () => {
    if (postMessage.trim() === '') {
      setError('Post message cannot be empty');
      return;
    }

    try {
      // Assume user_id is 2
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 2, post_message: postMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('Post created:', data);
      setPostMessage('');
      setError(null);
      // Optionally, trigger a refresh of posts or redirect
    } catch (error) {
      console.error('Error posting content:', error);
      setError('Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <textarea
        value={postMessage}
        onChange={(e) => setPostMessage(e.target.value)}
        placeholder="Where are you heading?"
      />
      <button onClick={handlePostSubmit}>Post</button>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NewPost;
