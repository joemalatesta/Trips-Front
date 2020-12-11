import React from 'react'
import { Card } from 'semantic-ui-react'

export default function Comments(props) {

  const comments = props.comments.map(comment => {
    return (
      <Card key={ props.comments.id } onClick={ () => props.getComments(comments.id) }>
        <Card.Content>
          <Card.Header>{ props.comments.comments }</Card.Header>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group
      centered={ true }
      backgroundcolor={ 'green' }>
      { comments }
    </Card.Group>
  )
}
