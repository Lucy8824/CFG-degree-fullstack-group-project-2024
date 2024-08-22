import React, { useState, useEffect } from 'react';



// get request
const FeedsPage = () => {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3006/Feeds');
            console.log('Full Response:', response);

            const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            console.log(data);
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


   
    const [firstName, setFirstName] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [postMessage, setPostMessage] = useState('');
    
    // post request
    const Post = async (event) => {
        event.preventDefault();
        console.log("It's working")
        const postData = {
            first_name: firstName,
            profile_picture_url: profilePictureUrl,
            post_message: postMessage,
          };
          try {
            const secondResponse = await fetch('http://localhost:3006/Feeds', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
              });
              if (secondResponse.ok) {
                console.log('Post created successfully!');
                setFirstName('');
                setProfilePictureUrl('');
                setPostMessage('');
              } else {
                console.error('Failed to create post');
              }
            } catch (error) {
              console.error('Error creating post:', error);
            }
          };
    
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

        
        {/* displaying the posts */}
        <div>
                {posts.map((post, index) => (
                    <p key={index}>{post}</p>
                ))}
                {/* reply and message buttons with hidden input box */}
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
    };
}
    export default FeedsPage;
