import React, { Component } from 'react'
import axios from 'axios'
import './PostComplet.css'

class PostComplet extends Component {


    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
                .then(response => {
                    this.setState({
                        loadedPost: response.data
                    })
                })
            }
        }
    }

    supprimePost = () => {
        axios.delete("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
            .then(response => {
                console.log(response);
                
            })
    }

    render () {
        let post = <p className="text-center display-4">Choisis un article !</p>;
        if(this.props.id) {
            post = <p className="text-center">Chargement...</p>
        }
        if(this.state.loadedPost) {
            post = (
                <div className="PostComplet">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                            onClick={this.supprimePost}
                            className="btn btn-danger my-3">Supprimer</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default PostComplet;