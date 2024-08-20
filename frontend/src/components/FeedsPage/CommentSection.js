import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch comments for the given postId
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3006/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3006/comments', {
                post_id: postId,
                user_id: 1, // Replace with actual user ID
                comment: newComment
            });

            // Refresh comments after adding a new one
            const response = await axios.get(`http://localhost:3006/comments/${postId}`);
            setComments(response.data);

            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comment-section">
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Comment</button>
            </form>
            <div className="comments-list">
                {comments.map(comment => (
                    <div key={comment.comment_id}>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;