import React from "react";
import CommentSection from "./CommentSection";

const Post = ({postId, post}) => {

    return (
        <div>
        <div className="post">
            <div className="post-header">
                <img src={post.profile_picture_url} alt={`${post.first_name}'s profile`} style={{
                    height: 100,
                    width: 100,
                }} />
                <h3>{post.first_name}</h3>
            </div>
        </div>
        <p>{post.post_message}</p>

    <CommentSection postId={postId} />

        </div>
    );
};

export default Post; 