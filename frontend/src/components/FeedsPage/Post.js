import React from 'react';
import CommentSection from './CommentSection';

const Post = ({ post }) => {
    const { post_id, profile_picture_url, first_name, post_message, created_at } = post;

    return (
        <div className="post">
            <div className="post-header">
                <img 
                    src={profile_picture_url} 
                    alt={`${first_name}'s profile`} 
                    style={{ height: 100, width: 100 }} 
                />
                <h3>{first_name}</h3>
            </div>
            <p>{post_message}</p>
            <small>Posted on: {new Date(created_at).toLocaleString()}</small>
            <CommentSection postId={post_id} />
        </div>
    );
};

export default Post;