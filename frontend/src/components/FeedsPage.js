import React, { useState, useEffect } from 'react';
import "./FeedsPage.css";




const FeedsPage = () => {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/Feeds');
            console.log('Full Response:', response);

            const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            setPosts((data));
        } else {
        const textData = await response.text();
        console.error('Received non-JSON response:', textData);
        }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
 

    useEffect(() => {
        fetchPosts();
    }, []);


    const userName = "Lydia";
    const userImage = <img src="/Users/lydiahague/Documents/IMG_1733.jpg"></img>;
    
    const Post = (event) => {
        event.preventDefault();
        if (input !== ''){
            const newPost = [
                userName,
                userImage,
                input
        ];
            setPosts([...posts, newPost]);
            setInput('');
        }
    }
    
    return (

    <div>
        <h1>Festival Meetup</h1>
        <input type="text" placeholder="Search..."/>
       
        <form>
            <p>Lydia</p> <img src="/Users/lydiahague/Downloads/IMG_6205.HEIC"></img>
            <input type="text" 
            value={input} 
            placeholder="Write your post here..." 
            onChange={(e) => setInput(e.target.value)}/>
           
            <button type="submit" onClick={Post}>Post</button>
        </form>
        
        <div>
                {posts.map((post, index) => (
                    <p key={index}>{post}</p>
                ))}
                <button id="replyButton" onClick= {reply()} >Reply</button><button>Message</button>
                <input type="text" id="replyBox" className="hide"/>
            </div>
  
</div>
    );
    
   
    
    function reply() {
        const text = document.getElementById("replyBox")
    //     if (text.style.display === "none") {
    //         text.style.display = "block"
    //     }
    }
};

export default FeedsPage;
