import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'

export default class ShowPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayNewPostForm: false
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

  getTrips = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/trips/all"
    console.log(url)
    const tripsResponse = await fetch(url)
    const tripsJson = await tripsResponse.json()
    this.setState({
      trips: tripsJson.data
    })
    console.log(this.state.trips)

    } catch(err) {
    console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }

  deleteTrip = async () => {
    console.log(this.props.trips.id)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.props.trips.id
      console.log(url)
      const deleteTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE'
      })
      const deleteTripJson = await deleteTripResponse.json()

      if(deleteTripResponse.status === 200) {
        console.log('Trip DELETED.', deleteTripJson)
        this.setState({
          trips: [],
          showTrip: false
        })
      }
    } catch(err) {
      console.log('ERROR DELETING Trip.', err)
    }
    this.getTrips()
  }

  getMyTrips = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/"

      console.log(url)

      const tripsResponse = await fetch(url, { credentials: 'include' })

      const tripsJson = await tripsResponse.json()

      this.setState({
        trips: tripsJson.data,
        showTrip: !this.state.showTrip
      })

      console.log(this.state.trips)

    } catch(err) {
      console.log("Error getting trip data.", err)
    }
  }

  updateTrip = async (updatedTripInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.state.tripIdToEdit
      const updateTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedTripInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updateTripJson = await updateTripResponse.json()

      if(updateTripResponse.status === 200) {
        console.log('Trip UPDATED.')
        this.setState({
          trips: updateTripJson.data,
          tripIdToEdit: -1
        })
      }
      this.getMyTrips()
    } catch(err) {
      console.log('ERROR UPDATING Trip.', err)
    }
  }

  createPost = async (postToCreate) => {
    console.log(postToCreate)
    console.log(this.props.posts)
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
          posts: [...this.state.posts, createPostJson.data]
        })
      }
      this.getMyPosts()
    } catch(err) {
      console.log('ERROR CREATING Post', err)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card key={this.props.trips.id}  raised={true} color={'blue'} centered={true}>
          <Card.Content>
            <Card.Header>{this.props.trips.trip_name}</Card.Header>
            <Card.Meta>{this.props.trips.trip_date}</Card.Meta>
            <Card.Description>{this.props.trips.about_trip}</Card.Description>
            <Card.Meta>{this.props.trips.user.username}</Card.Meta>
            <Card.Header>{
              this.posts.user_posts.map(post =>
                <TripCard
                  name={this.posts.user_posts}
                />)}
            </Card.Header>
            {
              this.props.trips.user.id === this.props.currentUserId
              &&
                <React.Fragment>
                  <Button onClick={this.deleteTrip}>DELETE</Button>
                  <Button onClick={this.toggleEditTripForm}>EDIT</Button>
                  <Button onClick={this.toggleNewPostForm}>NEW POST</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditTripForm
          && <EditTripForm
                trips={this.props.trips}
                displayEditTripForm={this.state.displayEditTripForm}
                toggleEditTripForm={this.toggleEditTripForm}
                updateTrip={this.props.updateTrip}
              />
        }
        {
          this.state.displayNewPostForm
          && <NewPostForm
                trips={this.props.trips}
                displayNewPostForm={this.state.displayNewPostForm}
                toggleNewPostForm={this.toggleNewPostForm}
                createPost={this.createPost}
              />
        }
      </React.Fragment>
    )
  }
}
