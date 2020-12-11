import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import EditTripForm from '../EditTripForm'

export default class ShowTrip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayNewPostForm: false,
      displayNewPicForm: false,
      trip_pics: [],
      comments: '',
    }
  }


  toggleEditTripForm = () => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm
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
        console.log('TRIP DELETED.', deleteTripJson)
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

  createComment = async (commentToCreate) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/api/comments/'
      const createCommentResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(commentToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
         credentials: 'include'
      })
      const createCommentJson = await createCommentResponse.json()
      if (createCommentResponse.status === 200 || createCommentResponse.status === 201) {
        console.log('COMMENT CREATED')
        this.setState({
          comments: [...this.state.comments, createCommentJson.data]
        })
      }
      this.seeAllTrips()
    } catch(err) {
      console.log('ERROR CREATING COMMENT', err)
    }
  }

  getComments = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/comments"
      const commentsResponse = await fetch(url)
      const commentsJson = await commentsResponse.json()
      this.setState({
        comments: commentsJson.data
      })
      } catch(err) {
      console.log("ERROR RETRIEVING COMMENT DATA.", err)
    }
  }


  render() {
    return (
      <React.Fragment>
        <Card key={this.props.trip.id}  raised={true} color={'blue'} centered={true}>
          <Card.Content>
            <Card.Header>{ this.props.trip.trip_name }</Card.Header>
            <Card.Meta>{ this.props.trip.user.username }</Card.Meta>
            <Card.Description>{ this.props.trip.about_trip }</Card.Description>
            <Card.Meta>{ this.props.trip.user_posts }</Card.Meta>
            <Card.Meta>{ this.props.trip.trip_date }</Card.Meta>
             <Image src={ this.props.trip.trip_pics } size='big' />
            {
              this.props.trip.user.id === this.props.currentUserId
              &&
                <React.Fragment>
                  <Button onClick={ this.deleteTrip }>DELETE</Button>
                  <Button onClick={ this.toggleEditTripForm }>EDIT</Button>
                  <Button onClick={ this.createComment }>COMMENT</Button>
                </React.Fragment>
            }
          </Card.Content>
        </Card>
        {
          this.state.displayEditTripForm
          && <EditTripForm
                trip={ this.props.trip }
                trips={ this.props.trips }
                displayEditTripForm={ this.state.displayEditTripForm }
                toggleEditTripForm={ this.toggleEditTripForm }
                updateTrip={ this.props.updateTrip }
                seeAllTrips={ this.props.seeAllTrips }
                getTrip={ this.props.getTrip }
                user_posts={ this.props.user_posts }
                trip_name={ this.props.trip_name }
                trip_date={ this.props.trip_date }
                trip_pics={ this.props.trip_pics }
              />
        }
      </React.Fragment>
    )
  }
}
