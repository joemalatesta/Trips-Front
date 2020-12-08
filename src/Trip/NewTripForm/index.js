import React, { Component } from 'react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'
import Nav from '../../Nav'
export default class NewTripForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip_name: '',
      trip_date: '',
      about_trip: ''
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

    this.props.createTrip(this.state)
    this.props.toggleCreateTripForm()

    this.setState({
      trip_name: '',
      trip_date: '',
      about_trip: ''
    })
  }

  render() {
    return (
      <Modal
        as={ Form }
        open={ this.props.displayCreateTripForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Create New Trip Listing</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8p-mjGUip3QUct-RUgMS3Cc9xFo3AED4t7Q&usqp=CAU" wrapped />
          <Modal.Description>
            <Header>Enter Trip Listing Information</Header>
            <Label>Trip Name:</Label>
              <Form.Input
                type="text"
                name="trip_name"
                value={ this.value }
                placeholder="Enter the name of the Trip."
                onChange={ this.handleChange }
              />
              <Label>Date of Trip:</Label>
              <Form.Input
                type="text"
                name="trip_date"
                value={ this.state.trip_date }
                placeholder="Enter the date of the trip."
                onChange={ this.handleChange }
              />
              <Label>Trip Description:</Label>
              <Form.Input
                control='textarea'
                name="about_trip"
                rows='3'
                value={ this.state.aboutTrip }
                placeholder="Enter a description of the Trip."
                onChange={ this.handleChange }
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={ this.props.toggleCreateTripForm }>Cancel</Button>
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
