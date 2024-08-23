import React, { useState, useEffect } from 'react';
import Post from './Post';
import NewPost from './NewPost';


const FeedsPage = ({userid}) => {
   
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
    const updatePosts = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };
 

    useEffect(() => {
        fetchPosts();
      
    }, []);

    return (

    <div>
       <h2>Festival Feed</h2>
       <NewPost userId={userid} setPosts={updatePosts} />
        
       {posts.map((post, index) => (
  <Post key={index} postId={post.post_id} post={post} userid={userid} />
))}


</div>
    );
}
    export default FeedsPage;