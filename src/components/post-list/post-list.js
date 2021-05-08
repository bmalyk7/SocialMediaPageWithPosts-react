import React from "react";
import PostListItem from "../post-list-item/post-list-item";

const PostList = ({data, onDelete, onToggleImportant, onToggleLiked, changeValue, editValue}) => {

    const elements = data.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li key={id} className='list-group-item'>
                <PostListItem
                    onDelete={() => onDelete(id)} {...itemProps}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}
                    editValue={editValue}
                    id={id}
                />
            </li>
        )
    })

    return (<ul className='app-list list-group'>
            {elements}
        </ul>

    )

}

export default PostList