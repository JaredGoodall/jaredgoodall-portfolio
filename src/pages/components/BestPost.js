import React from 'react';

function BestPost({message}) {
    const date = new Date(message.timestamp_ms);

    // Extract date and time components
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Create a formatted date and time string
    const formattedDateTime = `${day}/${month}/${year} at ${(hours)}:${minutes}`;
    
    return (
        <div className='user-space'>
            <div className='best-post'>
                From <strong>{message.sender_name}</strong> at <strong>{formattedDateTime}</strong> <br />
                
                {message.share ? (
                    <a href={message.share.link}>Link to post</a>
                ) : message.photos ? 
                    ("Sent " + message.photos.length + (message.photos.length === 1 ? (" photo") : (" photos"))) 
                    : (message.content)}
                <br />
            </div>
        </div>
    );
}

export default BestPost;