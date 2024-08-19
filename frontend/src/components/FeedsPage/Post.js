import React, { useState } from "react";
import CommentSection from "./CommentSection";

const Post = ({postId, post}) => {

    return (
        <div>
        <div className="post">
            <div className="post-header">
                <img src={post.profile_picture_URL} alt={`${post.first_name}'s profile`} />
                <h3>{post.first_name}</h3>
            </div>
        </div>
        <p>{post.post_message}</p>

    <CommentSection postId={postId} />

        </div>
    );
};

export default Post; 