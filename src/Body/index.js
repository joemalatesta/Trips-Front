import React, { Component } from 'react'
import TripContainer from '../Trip/TripContainer'
import ShowTrip from '../Trip/ShowTrip'
import EditTripForm from '../Trip/EditTripForm'

export default class Body extends Component {

  constructor(props) {
    super(props)

    this.state = {
      displayEditTripForm: false,
      displayMyTripCard: false
    }
  }


  toggleEditTripForm = (tripToEdit) => {
    this.setState({
      displayEditTripForm: !this.state.displayEditTripForm,
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
            trip_name={ this.props.trip_name }
            trip_date={ this.props.trip_date }
            user_posts={ this.props.user_posts }
            trip_pics={ this.props.trip_pics }
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
            comments={ this.props.comments}
            />
          : <TripContainer
              trip_name={ this.props.trip_name }
              trip_date={ this.props.trip_date }
              user_posts={ this.props.user_posts }
              trip_pics={ this.props.trip_pics }
              trip={ this.props.trip }
              trips={ this.props.trips }
              getTrips={this.props.getTrips}
              loggedIn={ this.props.loggedIn }
              getTrip={ this.props.getTrip }
              toggleEditTripForm={ this.toggleEditTripForm }
              seeAllTrips={ this.props.seeAllTrips }
              getMyTrips={ this.props.getMyTrips }
              comments={ this.props.comments}
            />
        }
      </React.Fragment>
    )
  }
}
