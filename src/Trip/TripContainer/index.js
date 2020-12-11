import React from 'react'
import TripCard from '../TripCard'

export default function TripContainer(props) {
  return (
    <TripCard
      comments={ props.comments }
      trip={ props.trip }
      trips={ props.trips }
      loggedIn={ props.loggedIn }
      getTrip={ props.getTrip }
      getMyTrips={ props.getMyTrips }
      toggleEditTripForm={ props.toggleEditTripForm }
      seeAllTrips={ props.seeAllTrips }
      user_posts={ props.user_posts }
      trip_name={ props.trip_name }
      trip_date={ props.trip_date }
      trip_pics={ props.trip_pics }
    />
  )
}
