import React from 'react'
import CommentCard from '../CommentCard'
import ShowTrip from '../ShowTrip'
export default function TripContainer(props) {
  return (
    <CommentCard
      comments={ props.comments }

    />
  )
}
