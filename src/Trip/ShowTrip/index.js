import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import EditTripForm from '../EditTripForm'
import NewPostForm from '../../Posts/NewPostForm'
import TripCard from '../TripCard'
import Body from '../../Body'
import Nav from '../../Nav'
import PostCard from '../PostCard'
export default class ShowTrip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayNewPostForm: false,
      user_posts: [],
    }
  }

  toggleEditTripForm = () => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm
    })
  }

  toggleNewPostForm =() => {
    this.setState({
      displayNewPostForm: !this.state.displayNewPostForm
    })
  }

  deleteTrip = async () => {
    console.log(this.props.trip.id)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.props.trip.id

      const deleteTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deleteTripJson = await deleteTripResponse.json()

      if(deleteTripResponse.status === 200) {
        console.log('Trip DELETED.', deleteTripJson)
        this.setState({
          showtrips: false
        })
        this.props.removeTrip(this.props.trip.id)
        this.props.getTrips()
      }
    } catch(err) {
      console.log('ERROR DELETING Trip.', err)
    }

  }


  createPost = async (postToCreate) => {
    console.log(postToCreate)
    console.log(this.state.posts)
    console.log(this.currentUserId)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/posts/'

      console.log(url)
      console.log(JSON.stringify(postToCreate))

      const createPostResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(postToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      console.log(createPostResponse)

      const createPostJson = await createPostResponse.json()

      console.log(createPostJson)

      if (createPostResponse.status === 200 || createPostResponse.status === 201) {
        console.log('Post CREATED')
        this.setState({
          user_posts: [...this.state.user_posts, createPostJson.data]
        })
      }
    } catch(err) {
      console.log('ERROR CREATING Post', err)
    }
  }

  getPosts = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/posts/" + this.state.user_posts
    console.log(url)
    const postsResponse = await fetch(url)
    const postsJson = await postsResponse.json()
    this.setState({
      user_posts: postsJson.data
    })
    console.log(this.state.user_posts)

  } catch(err) {
    console.log("ERROR RETRIEVING POST DATA.", err)
    }
  }


  render() {
    return (
      <React.Fragment>
        <Card key={this.props.trip.id}  raised={true} color={'blue'} centered={true}>
          <Card.Content>
            <Card.Header>{ this.props.trip.trip_name }</Card.Header>
            <Card.Meta>{ this.props.trip.trip_date }</Card.Meta>
            <Card.Description>{ this.props.trip.about_trip }</Card.Description>
            <Card.Meta>{ this.props.trip.user.username }</Card.Meta>
              <div className="CardContainer">
                  {
                      this.state.user_posts.map(post =>
                          <PostCard name={this.state.user_posts} key={this.state.user_posts.id}/>)
                  }
                  {}
              </div>
            < ></>

            {
              this.props.trip.user.id === this.props.currentUserId
              &&
                <React.Fragment>
                  <Button onClick={ this.deleteTrip }>DELETE</Button>
                  <Button onClick={ this.toggleEditTripForm }>EDIT</Button>
                  <Button onClick={ this.toggleNewPostForm }>NEW POST</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditTripForm
          && <EditTripForm
                trip={ this.props.trip }
                displayEditTripForm={ this.state.displayEditTripForm }
                toggleEditTripForm={ this.toggleEditTripForm }
                updateTrip={ this.props.updateTrip }
                seeAllTrips={ this.props.seeAllTrips }
                getTrip={this.props.getTrip}
              />
        }
        {
          this.state.displayNewPostForm
          && <NewPostForm
                trip={this.props.trip }
                displayNewPostForm={ this.state.displayNewPostForm }
                toggleNewPostForm={ this.toggleNewPostForm }
                createPost={ this.createPost }
              />
        }
        {
          <PostCard
            user_posts={this.state.user_posts}
            getPosts={this.getPosts}
            createPost={ this.createPost }
          />
        }
      </React.Fragment>
    )
  }
}
