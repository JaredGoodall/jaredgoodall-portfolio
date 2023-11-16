import React from 'react';

function UserData({participant, index}) {
    return (
        <div className='user-space'>
            <div key={index} className="user-card">
                <strong>Name:</strong> {participant.name} <br />
                Total message count: {participant.messageCount}<br />
                Average message reacts: {participant.messageCount === 0 ? (0) : (Math.round((participant.likedCount / participant.messageCount + Number.EPSILON) * 1000) / 1000)} <br />
                Post count: {participant.postCount} <br />
                Average post reacts: {participant.postCount === 0 ? 0 : Math.round((participant.postLikedCount / participant.postCount + Number.EPSILON) * 1000) / 1000} <br />
            </div>
            <br />
        </div>
    );
}

export default UserData;