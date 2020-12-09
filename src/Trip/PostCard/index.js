import React from 'react'
import { Card } from 'semantic-ui-react'

export default function PostCard(props) {


  const posts = props.user_posts.map(post => {
    return (
      <Card key={ posts.trip_id } onClick={ () => props.getPosts(posts.id) }>
        <Card.Content>
          <Card.Header>{ posts }</Card.Header>
        </Card.Content>
      </Card>
    )
  })
  console.log(props.user_posts)
  return (
    <Card.Meta>
      { posts }
    </Card.Meta>
  )
}
