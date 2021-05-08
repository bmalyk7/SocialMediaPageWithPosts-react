import React, {useState,useEffect} from "react";

const PostListItem = ({label, id, editValue, onDelete, onToggleImportant, onToggleLiked, important, like}) => {
    const [input, setInput] = useState(false);
    const [value, setValue] = useState(label)


    const onEdit = (e) => {
        setInput(!input);
    }


    const changeLabel = (e) => {
        e.preventDefault()
        if(value.length > 0){
            editValue(value, id)
            setInput(!input);
        }
    }

    const changeValue = (e) => {
        const body = e.target.value
        setValue(body)
    }

    useEffect(()=>{
        console.log('use effect')
    }, [])

    let classNames = 'app-list-item d-flex justify-content-between'
    if (important) {
        classNames += ' important'
    }
    if (like) {
        classNames += ' like'
    }


    return (
        <li className={classNames}>
            {input ?
                <form onSubmit={changeLabel}><input type="text" value={value} onChange={changeValue}/>
                    <button type="submit">submit</button>
                </form> : <span className='app-list-item-label' onClick={onToggleLiked}>{label}</span>}
            <div className='d-flex justify-content-center align-items-center'>
                <button
                    onClick={onEdit}
                    type='button'
                >
                    edit
                </button>
                <button type='button' className='btn-star btn-sm' onClick={onToggleImportant}>
                    <i className='fa fa-star'></i>
                </button>
                <button type='button'
                        className='btn-trash btn-sm'
                        onClick={onDelete}
                >
                    <i className='fa fa-trash-o'></i>
                </button>
                <i className='fa fa-heart'></i>
            </div>
        </li>
    )
}

export default PostListItem