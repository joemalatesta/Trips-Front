import React, { Component } from 'react'
import TripContainer from '../Trip/TripContainer'
import ShowTrip from '../Trip/ShowTrip'
import EditTripForm from '../Trip/EditTripForm'

export default class Body extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayNewPostForm: false,
      displayMyTripCard: false
    }
  }

  toggleEditTripForm = (tripToEdit) => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm,
    })
  }

  toggleNewPostForm =() => {
    this.setState({
      displayNewPostForm: !this.state.displayNewPostForm
    })
  }

  toggleMyTripCard =() => {
    this.setState({
      displayMyTripCard: !this.state.displayMyTripCard
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.showTrip
          ? <ShowTrip
            trip={ this.props.trip }
            trips={ this.props.trips }
            currentUserId={ this.props.currentUserId }
            deleteTrip={ this.props.deleteTrip }
            removeTrip={ this.props.removeTrip}
            getTrips={this.props.getTrips}
            getTrip={this.props.getTrip}
            showTrip={ this.props.showTrip }
            tripIdToEdit={this.props.tripIdToEdit}
            updateTrip={this.props.updateTrip}
            seeAllTrips={ this.props.seeAllTrips }
            createPost={ this.createPost }
            />
          : <TripContainer
              trip={ this.props.trip }
              trips={ this.props.trips }
              getTrips={this.props.getTrips}
              loggedIn={ this.props.loggedIn }
              getTrip={ this.props.getTrip }
              toggleEditTripForm={ this.toggleEditTripForm }
              togglePostForm={ this.togglePostForm }
              seeAllTrips={ this.props.seeAllTrips }
              getMyTrips={ this.props.getMyTrips }
              createPost={ this.createPost }
            />
        }
      </React.Fragment>
    )
  }
}
