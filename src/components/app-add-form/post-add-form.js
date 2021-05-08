import React, {useState} from "react";

const PostAddForm = (props) => {
    const [text, setText] = useState('')


    const onChange = (e) =>{
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(text.length >0){
            props.onAdd(text)
            setText('')
        }
    }


        return (
            <form
                className='bottom-panel d-flex'
                onSubmit={onSubmit}
            >
                <input
                    onChange={onChange}
                    className='form-control new-post-label'
                    type='text'
                    placeholder='What are you thinking about?'
                    value={text}
                />
                <button
                    type='submit'
                    className='btn btn-outline-secondary'
                >
                    Post
                </button>
            </form>
        )

}

export default PostAddForm