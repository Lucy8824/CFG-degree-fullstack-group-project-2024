import React, { useState, useEffect } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import NavBar from '../NavBar/NavBar';
import { useParams } from 'react-router-dom';
import './FeedsPage.css';


const FeedsPage = () => {
const { user_id: userId } = useParams()
const [posts, setPosts] = useState([]);
console.log('userId', userId);

// gets the feeds, but requires refreshing to display  

    const fetchPosts = async () => {
        try {
            // Fetch data from the backend
            const response = await fetch(`/Feeds/${userId}`);
            console.log("response", userId);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                setPosts(data); // Set the state with the fetched data
                console.log("feedspage",data);
                
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
    
    <>
    <NavBar userId={userId} />

    <div className="feeds-container">
       <h2 className="feeds-title">Festival Feed</h2>
       <NewPost userId={userId} setPosts={updatePosts} />
        
       {posts.map((post, index) => (
  <Post key={index} postId={post.post_id} post={post} userId={userId} />
))}


</div>
</>
    );
}
    export default FeedsPage;