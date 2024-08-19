import React, { useState, useEffect } from 'react';
import "./FeedsPage.css";
import Post from './Post';


const FeedsPage = () => {
    // const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            // Fetch data from the backend
            const response = await fetch('http://localhost:3006/Feeds');
    

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setPosts(data); // Set the state with the fetched data
                
            } else {
                // Handle non-JSON responses
                const textData = await response.text();
                console.error('Received non-JSON response:', textData);
              
            }
        } catch (error) {
            // Log the error message
            console.error('Error fetching posts:', error);
        }
    };
 

    useEffect(() => {
        fetchPosts();
      
    }, []);
    // const [firstName, setFirstName] = useState('');
    // const [profilePictureUrl, setProfilePictureUrl] = useState('');
    // const [postMessage, setPostMessage] = useState('');
    
    // const Post = async (event) => {
    //     event.preventDefault();
    //     console.log("It's working")
    //     const postData = {
    //         first_name: firstName,
    //         profile_picture_url: profilePictureUrl,
    //         post_message: postMessage,
    //       };
    //       try {
    //         const secondResponse = await fetch('/Feeds', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(postData),
    //           });
    //           if (secondResponse.ok) {
    //             console.log('Post created successfully!');
    //             setFirstName('');
    //             setProfilePictureUrl('');
    //             setPostMessage('');
    //           } else {
    //             console.error('Failed to create post');
    //           }
    //         } catch (error) {
    //           console.error('Error creating post:', error);
    //         }
    //       };
    return (

    <div>
       <h2>Festival Feed</h2>
        
       {posts.map((post) => (
  <Post key={post.post_id} postId={post.post_id} post={post} />
))}


</div>
    );
}
    export default FeedsPage;