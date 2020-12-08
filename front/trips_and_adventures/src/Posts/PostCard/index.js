import React from 'react'
import { Card } from 'semantic-ui-react'

export default function PostCard(props) {

  const posts = props.posts.map(post => {
    return (
      <Card key={ post.id } onClick={ () => props.getPost(post.id) }>
        <Card.Content>
          <Card.Header>{ post.user_posts }</Card.Header>
        </Card.Content>
      </Card>
    )
  })

  return (
    <Card.Group centered={ true }>
      { posts }
    </Card.Group>
  )
}
