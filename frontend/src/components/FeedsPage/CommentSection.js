import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedsPage.css';
const CommentSection = ({ userId, postId }) => {
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

// gets the comments, but requires refreshing to display  

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3006/comments', {
                post_id: postId,
                user_id: userId,
                comment: newComment
            });

            // Refresh comments after adding a new one
            const response = await axios.get(`http://localhost:3006/post/${postId}/comments`);
            setComments(response.data);
            console.log("Comment:", response.data);
            
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
                        <img className="post-header" src={comment.profile_picture_url} alt="profile picture"
                        style={{height:50, width:50}}/>
                        <p>{comment.first_name}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;