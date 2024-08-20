import React, { useState } from 'react';
import axios from 'axios';

const NewPost = ({ setPosts, userId }) => {
    const [content, setContent] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            user_id: userId,
            post_message: content
        };

        try {
            const response = await axios.post('http://localhost:3006/newpost', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newPost = response.data;

            setPosts(prevPosts => [newPost, ...prevPosts]);
            setContent('');
        } catch (error) {
            console.error('Error creating post:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handlePostSubmit}>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What festival are you excited about?"
                rows="4"
                cols="50"
                required
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default NewPost;
