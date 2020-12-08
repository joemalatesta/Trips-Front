import React from 'react'
import TripCard from '../TripCard'

export default function TripContainer(props) {
  return (
    <TripCard
      trip={ props.trip }
      trips={ props.trips }
      loggedIn={ props.loggedIn }
      getTrip={ props.getTrip }
      getMyTrips={ props.getMyTrips }
      toggleEditTripForm={ props.toggleEditTripForm }
      seeAllTrips={ props.seeAllTrips }
    />
  )
}
