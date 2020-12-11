import React from 'react'
import CommentCard from '../CommentCard'


export default function CommentContainer(props) {
  return (
    <CommentCard
      comments={ props.comments }

    />
  )
}
