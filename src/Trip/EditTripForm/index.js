import React, { Component } from 'react'
import { Button, Form, Header, Image, Label, Modal } from 'semantic-ui-react'
import ShowTrip from '../ShowTrip'
export default class EditTripForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      trip_name: this.props.trip.trip_name,
      trip_date: this.props.trip.trip_date,
      about_trip: this.props.trip.about_trip,
    }

    //console.log("this State    ", this.state.trip.trip_name)
    console.log("this State    ", this.props.trip.trip_name)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value)
  }

  handleDropChange = (event, data) => {
    this.setState({
      status: data.value
    })
      console.log("Drop Change   " + data.value)
  }

  handleSubmit = (event) => {
    console.log("submit   " + event)
    event.preventDefault()

    this.updateTrip(this.state)
    console.log("handle submit" + this.state)
    this.props.toggleEditTripForm()

    this.setState({
      trip_name: '',
      trip_date: '',
      about_trip: '',
    })


  }

  updateTrip = async (updatedTripInfo) => {

    console.log("update trip   " + updatedTripInfo)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/' + this.props.trip.id
      console.log("this is my url   " + url)
      const updateTripResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedTripInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const updateTripJson = await updateTripResponse.json()

      if(updateTripResponse.status === 200) {
        console.log('Trip UPDATED.')
        // await this.setState({
        //   trips: updateTripJson.data,
        //   tripIdToEdit: -1
        // })
      }
      this.props.getTrip(this.props.trip.id)
      this.props.seeAllTrips()
    } catch(err) {
      console.log('ERROR UPDATING Trip.', err)
    }
  }


  render() {


    return (
      <Modal
        as={ Form }
        open={ this.props.displayEditTripForm }
        onSubmit={ this.handleSubmit }
      >
        <Modal.Header>Edit Trip Listing</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://s3-us-west-1.amazonaws.com/acropolis-wp-content-uploads/2019/06/bulldozer-digging-construction-dirt-worksite.jpg" wrapped />
          <Modal.Description>
            <Header>Enter Trip Listing Information</Header>
            <Label>Trip Name:</Label>
              <Form.Input
                type="text"
                name="trip_name"
                value={ this.state.trip_name }
                onChange={ this.handleChange }
              />
              <Label>Date of Trip:</Label>
              <Form.Input
                type="text"
                name="trip_date"
                value={ this.state.trip_date }
                onChange={ this.handleChange }
              />
              <Label>About the Trip:</Label>
              <Form.Input
                control="textarea"
                name="about_trip"
                rows='4'
                value={ this.state.about_trip }
                onChange={ this.handleChange }
              />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={ this.props.toggleEditTripForm }>Cancel</Button>
          <Button
            content="Change Trip Listing"
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
