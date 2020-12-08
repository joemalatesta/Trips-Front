import React, { Component } from 'react'
import { Button, Form, Label, Modal } from 'semantic-ui-react'

export default class PostForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      user_posts: '',
    }
    console.log(props.trips[props.postIdToEdit])
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

    this.props.editPost(this.state)
    this.props.togglePostForm()

    this.setState({
      user_posts: '',
    })
  }

  render() {


    return (
      <Modal
        as={ Form }
        open={ this.props.displayPostForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Add to Your Posts</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Label>Post:</Label>
              <Form.Input
                type="textarea"
                name="user_posts"
                rows='6'
                value={ this.state.user_posts }
                onChange={ this.handleChange }
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={ this.props.toggleEditTripForm }>Cancel</Button>
          <Button
            content="Create Trip Listing"
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
