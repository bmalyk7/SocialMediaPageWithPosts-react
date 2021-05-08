import React, {Component} from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../app-add-form/post-add-form";

import '../app/app.css'
import '../app-add-form/post-add-form.css'
import '../app-header/app-header.css'
import '../search-panel/search-panel.css'
import '../post-list-item/post-list-item.css'
import '../post-list/post-list.css'
import '../avatar/avatar.css'
import Avatar from "../avatar/avatar";


export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: JSON.parse(localStorage.getItem('items')) || [],
            term: '',
            filter: 'All',
        };
        this.addItem = this.addItem.bind(this);
        this.maxId = 0;
        this.deleteItem = this.deleteItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onEdit = this.onEdit.bind(this)
    }

    addItem(body){
        const newItem = {
            label: body,
            important: false,
            liked: false,
            id: this.maxId++,
        }
       this.setState(({data})=>{
           const newArr = [...data, newItem];
           return {
               data: newArr,
           }
       })
    }




    componentDidUpdate() {
        localStorage.setItem('items', JSON.stringify(this.state.data))
    }

    deleteItem(id) {
        this.setState(({data})=>{
            const index = data.findIndex(elem =>elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id ===id)
            const item = data[index];
            const newItem = {...item, important: !item.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return{
                data:newArr
            }
        })
    }


    searchPosts(items, term){
        if(term.length===0){
            return items
        }

       return  items.filter(item =>{
           const row = item.label.toLowerCase()
           return row.indexOf(term) > -1;
       })
    }

    filterPosts(data, filter){
        switch (filter){
            case 'Likes': return data.filter(item =>item.like);

            case 'Important': return data.filter(item =>item.important);

            default: return data;
        }
    }

    onUpdateSearch(term){
        this.setState(({term}))
    }

    onFilterSelect(filter){
        this.setState(({filter}))
    }

    onToggleLiked(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem =>elem.id === id);
            const item = data[index];
            const newItem = {...item, like: !item.like}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)]
            return{
                data:newArr
            }
        })
    }

    onEdit(body, id){
    this.setState(({data})=>{
        const index = data.findIndex(elem=> elem.id === id);
        const item = data[index];
            const newItem = {...item, label: body}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)]
            return {
                data: newArr
            }
    })
    }


    render() {
        const {data, term, filter} = this.state;
        const visiablePosts = this.filterPosts(this.searchPosts(data, term), filter);
        return(<div className='app'>
                <div className='photo_wrapper'>
                    <Avatar />
                    <AppHeader
                        allPosts={this.state.data.length}
                        likedPosts={this.state.data.filter(item=>item.like === true).length}
                    />

                </div>
                <div className='search-panel d-flex'>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                    />
                </div>
                     <PostList
                         onDelete={this.deleteItem}
                          data={visiablePosts}
                          onToggleImportant={this.onToggleImportant}
                          onToggleLiked={this.onToggleLiked}
                               editValue={this.onEdit}
                     />
                     <PostAddForm onAdd={this.addItem} />
                </div>
            )
        }
    }
