import React, { useState, useEffect } from 'react';

const CommentSection = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      console.error('No postId provided');
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3006/posts/${postId}/comments`);
        if (!response.ok) throw new Error(`Failed to fetch comments: ${response.statusText}`);

        const data = await response.json();
        console.log('Fetched Data:', data); 
        setCommentList(data); // Set the state with fetched comments
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments');
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const response = await fetch('http://localhost:3006/Comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId, user_id: 1, comment: newComment }), // Replace user_id with actual user ID
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const data = await response.json();
      setCommentList([...commentList, data]); // Add the new comment to the list
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment');
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      {/* Display existing comments */}
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <div key={comment.comment_id} className="comment">
            <p>
              <strong>{comment.user_name}:</strong> {comment.comment}
            </p>
            <p className="comment-date">{new Date(comment.created_at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {/* Input field for new comment */}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleCommentSubmit}>Post Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;