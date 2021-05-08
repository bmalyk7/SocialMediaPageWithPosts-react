import React, {Component} from "react";

export default class PostStatusFilter extends Component{
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'All', label: 'All'},
            {name: 'Likes', label:'Likes'},
            {name: 'Important', label: 'Important'}
        ]
    }
    render() {
        const {filter, onFilterSelect} = this.props;
            const buttons = this.buttons.map(({name,label})=>{
                const active = filter === name;
                const className = active ? ' btn-info' : 'btn-outline-secondary'
            return(
                <button
                    key={name}
                    type='button'
                    className={`btn ${className}`}
                    onClick={()=>onFilterSelect(name)}>{label}</button>
            )
        })
        return (
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }
}
