import React, { Component } from 'react'
import { Button, Form, Grid, Modal, Image, Card, Label} from 'semantic-ui-react'

export default class TitlePage extends Component {


  render() {
    return (
      <Modal
        as={Form}
        open={this.props.displayTitleScreen}
        onSubmit={this.handleSubmit}
      >
        <Modal.Header>Let's go Outside</Modal.Header>
        <Modal.Content image>
          <Image size="large" src="https://previews.123rf.com/images/fpwing/fpwing1611/fpwing161100121/66833965-mountain-trails-three-peaks-lavaredo.jpg" wrapped />
          <Modal.Description>
            <Grid columns={1}>
              <Grid.Column>
              <Label>
                <h3>I've always loved the outdoors. I am kind of a nut though. My wife always asks if I watched this old show or that one. My response was always the same.. Nope, I was outside playing. Now that I'm older, I want to share those trips with others. I also want to know what they're getting themselves into.</h3>
                <h3>Welcome To My Site.......</h3>
              </Label>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.props.toggleTitleScreen}>View the posts</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
