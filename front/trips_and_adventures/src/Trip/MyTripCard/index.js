import React from 'react'
import { Card } from 'semantic-ui-react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'
import ShowTrip from '../ShowTrip'

export default function MyTripCard(props) {

  const trip = props.trips.map(trip => {
    return (
      <Card key={ trip.id } onClick={ () => props.getMyTrips(trip.id) }>
        <Card.Content>
          <Card.Header>{ trip.trip_name }</Card.Header>
          <Card.Meta>{ trip.trip_date }</Card.Meta>
          <Card.Description>{ trip.about_trip }</Card.Description>
          <Card.Meta>{ trip.user.username }</Card.Meta>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group
      centered={ true }
      backgroundcolor={ 'green' }>
      { trip }
    </Card.Group>
  )
}
