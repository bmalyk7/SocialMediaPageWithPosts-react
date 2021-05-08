import React from "react";

const AppHeader = ({allPosts, likedPosts}) => {
    return(
        <div className='app-header d-flex'>
            <h1>Bohdan Malyk</h1>
            <h2>{allPosts} signs, likes {likedPosts}</h2>
        </div>
    )
}

export default AppHeader