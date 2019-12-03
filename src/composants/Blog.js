import React, { Component } from 'react'
import axios from 'axios'
import Post from './Post/Post'
import PostComplet from "./PostComplet/PostComplet"
import NvPost from './NvPost/NvPost'
import './Blog.css'

class Blog extends Component {

    state = {
        posts: [],
        selectPostId: null
    }

    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                const articles = response.data.slice(0, 4)
                const postsAuteur = articles.map(post => {
                    return {
                        ...post,
                        auteur: 'Hugo'
                    }
                })
                this.setState({
                    posts: postsAuteur
                })
            })
    }

    selectPost = (id) => {
        this.setState({selectPostId: id})
    }

    render () {

        const posts = this.state.posts.map(post => {
            return <Post 
                    key={post.id} 
                    titre={post.title} 
                    auteur={post.auteur} 
                    clicked={() => this.selectPost(post.id)}
                    />
        })

        return (
            <div>
                <section>
                    <NvPost />
                </section>
                <section>
                    <PostComplet id={this.state.selectPostId} />
                </section>
                <h2 className="text-center my-5">Tous les Articles ...</h2>
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;