import React, { Component } from 'react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'

export default class NewPostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user_posts: '',

    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropChange = (event, data) => {
    this.setState({
      status: data.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.createPost(this.state)
    this.props.toggleNewPostForm()

    this.setState({
      user_posts: '',
    })
  }

  render() {
    return (
      <Modal
        as={ Form }
        open={ this.props.displayNewPostForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Create New Post</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYR_XvGxXDb7cPObv_6mXZ54Y-xZKQqdpAUA&usqp=CAU" wrapped />
          <Modal.Description>
            <Header>Enter Post</Header>
            <Label>{this.props.trip.trip_name}</Label>
              <Form.Input
                control="textarea"
                name="user_posts"
                rows="8"
                value={ this.value }
                placeholder="Enter your message here"
                onChange={ this.handleChange }
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={ this.props.toggleNewPostForm }>Cancel</Button>
          <Button
            content="Create New Post"
            labelPosition="right"
            icon="checkmark"
            type="Submit"
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
}
