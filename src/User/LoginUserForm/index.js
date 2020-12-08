import React, { Component } from 'react'
import { Button, Form, Grid, Image, Input, Label, Modal } from 'semantic-ui-react'

export default class LoginUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.props.loginUser(this.state)
    this.props.toggleLoginUserForm()

    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <Modal
        as={Form}
        open={this.props.displayLoginUserForm}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src="https://cdn.tourradar.com/s3/content-pages/447/680x496/6Rb2NK.jpeg" wrapped />
          <Modal.Description>
            <Grid columns={2} stackable>
              <Grid.Column>
                <Label>User Name:</Label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  placeholder="Enter your Username"
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Label>Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={this.props.toggleLoginUserForm}>Cancel</Button>
          <Button
            content="Login"
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
