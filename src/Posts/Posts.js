import React, { Component } from 'react'
// import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'

export default class Posts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_posts: '',
    }
  }



  getPost = async (idOfPost) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/posts/" + idOfPost
      console.log(url)
      const postResponse = await fetch(url)
      const postJson = await postResponse.json()
      this.setState({
        posts: postJson.data,
        showPost: !this.state.showPost
      })

      console.log(this.state.posts)

    } catch(err) {
      console.log("ERROR RETRIEVING Post DATA.", err)
    }
  }

  getMyPosts = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/posts/"

      console.log(url)

      const postsResponse = await fetch(url, { credentials: 'include' })

      const postsJson = await postsResponse.json()

      this.setState({
        posts: postsJson.data,
        showPost: !this.state.showPost
      })

      console.log(this.state.posts)

    } catch(err) {
      console.log("Error getting post data.", err)
    }
  }




  updatePost = async (updatedPostInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/posts/' + this.state.postIdToEdit
      const updatePostResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedPostInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updatePostJson = await updatePostResponse.json()

      if(updatePostResponse.status === 200) {
        console.log('Post UPDATED.')
        this.setState({
          posts: updatePostJson.data,
          postIdToEdit: -1
        })
      }
      this.getMyPosts()
    } catch(err) {
      console.log('ERROR UPDATING Post.', err)
    }
  }


  render() {
    return (
      <div className='App'>
        <Nav
          loggedIn={ this.state.loggedIn }
          createPost={ this.createPost }
          createUser={ this.createUser }
          loginUser={ this.loginUser }
          logoutUser={ this.logoutUser }
        />
        <Body
          posts={ this.state.posts }
          showPost={ this.state.showPost }
          loggedIn={ this.state.loggedIn }
          currentUserId={ this.state.currentUserId }

          getPost={ this.getPost }
          editPost={ this.editPost }
        />
      </div>
    )
  }
}
