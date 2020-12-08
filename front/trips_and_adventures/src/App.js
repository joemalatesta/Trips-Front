import './App.css'
import React, { Component } from 'react'
import Nav from './Nav'
import Body from './Body'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      trips: [],
      showTrip: false,
      currentUserId: '',
      tripIdToEdit: -1
    }
  }

  getTrips = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + "/api/trips/all"
    console.log(url)
    const tripsResponse = await fetch(url)
    const tripsJson = await tripsResponse.json()
    this.setState({
      trips: tripsJson.data
    })
    console.log(this.state.trips)

    } catch(err) {
    console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }

  getTrip = async (idOfTrip) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/" + idOfTrip
      console.log(url)
      const tripResponse = await fetch(url)
      const tripJson = await tripResponse.json()
      this.setState({
        trip: tripJson.data,
        showTrip: !this.state.showTrip
      })

      console.log(this.state.trips)

    } catch(err) {
      console.log("ERROR RETRIEVING Trip DATA.", err)
    }
  }

  getMyTrips = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/trips/"

      console.log(url)

      const tripsResponse = await fetch(url, { credentials: 'include' })

      const tripsJson = await tripsResponse.json()

      this.setState({
        trips: tripsJson.data,
        showTrips: !this.state.showTrips
      })

      console.log(this.state.trips)

    } catch(err) {
      console.log("Error getting trip data.", err)
    }
  }


  createTrip = async (tripToCreate) => {
    console.log(tripToCreate)
    console.log(this.props.trip)
    console.log(this.currentUserId)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/trips/'

      console.log(url)
      console.log(JSON.stringify(tripToCreate))

      const createTripResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(tripToCreate),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      console.log(createTripResponse)

      const createTripJson = await createTripResponse.json()

      console.log(createTripJson)

      if (createTripResponse.status === 200 || createTripResponse.status === 201) {
        console.log('Trip CREATED')
        this.setState({
          trips: [...this.state.trips, createTripJson.data]
        })
      }
      this.getTrips()
    } catch(err) {
      console.log('ERROR CREATING Trip', err)
    }
  }



  removeTrip = (tripId) => {
    console.log(this.state.trips)
    console.log(tripId)
    this.setState({
        trips: this.state.trips.filter(trip => tripId !== trip.id),
        showTrip: false

    })
  }

  createUser = async (userToAdd) => {
    console.log(userToAdd)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/register'
      const createUserResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToAdd)
      })

      const createUserJson = await createUserResponse.json()
      if (createUserResponse.status === 200 || createUserResponse.status === 201) {
        console.log('CREATED USER', createUserJson.data)
      }
    } catch(err) {
      console.log('ERROR CREATING USER', err)
    }
  }

  loginUser = async (userToLogin) => {
    console.log(userToLogin)
    try {
      const url = process.env.REACT_APP_API_URL + '/api/users/login'
      console.log(url)
      console.log(JSON.stringify(userToLogin))
      const loginUserResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userToLogin),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      console.log(loginUserResponse)
      const loginUserJson = await loginUserResponse.json()
      console.log(loginUserJson)
      console.log(loginUserJson.data.id)
      if (loginUserResponse.status === 200 || loginUserResponse.status === 201) {
        console.log('USER LOGGED IN')
        this.setState({
          loggedIn: !this.state.loggedIn,
          currentUserId: loginUserJson.data.id,
          currentUserName: loginUserJson.data.username
        })
      }
      this.getTrips()
    } catch(err) {
      console.log('ERROR LOGGING IN', err)
    }
  }


  logoutUser = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + "/api/users/logout"
      const logoutResponse = await fetch(url, {
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()
      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: !this.state.loggedIn
        })
      }
    } catch(err) {
      console.error("ERROR LOGGING OUT", err)
    }
    this.getTrips()
  }

  seeAllTrips = () => {
    this.setState({
      showTrip: false
    })
    this.getTrips()
  }

  seeAllMyTrips = () => {
    this.setState({
      showTrip: false
    })
    this.getMyTrips()
  }





  // createPost = async (postToCreate) => {
  //   console.log(postToCreate)
  //   console.log(this.props.posts)
  //   console.log(this.currentUserId)
  //   try {
  //     const url = process.env.REACT_APP_API_URL + '/api/posts/'
  //
  //     console.log(url)
  //     console.log(JSON.stringify(postToCreate))
  //
  //     const createPostResponse = await fetch(url, {
  //       method: 'POST',
  //       body: JSON.stringify(postToCreate),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: 'include'
  //     })
  //
  //     console.log(createPostResponse)
  //
  //     const createPostJson = await createPostResponse.json()
  //
  //     console.log(createPostJson)
  //
  //     if (createPostResponse.status === 200 || createPostResponse.status === 201) {
  //       console.log('Post CREATED')
  //       this.setState({
  //         posts: [...this.state.posts, createPostJson.data]
  //       })
  //     }
  //     this.getMyPosts()
  //   } catch(err) {
  //     console.log('ERROR CREATING Post', err)
  //   }
  // }

  componentDidMount() {
    this.getTrips()
  }

  render() {
    return (
      <div className='App'>
        <Nav
          trip={ this.state.trip }
          updateTrip={ this.updateTrip }
          loggedIn={ this.state.loggedIn }
          getTrips={ this.getTrips}
          getTrip={this.getTrip}
          getMyTrips={ this.getMyTrips }
          createTrip={ this.createTrip }
          createUser={ this.createUser }
          loginUser={ this.loginUser }
          logoutUser={ this.logoutUser }
          currentUserName={ this.state.currentUserName }
          showTrip={ this.state.showTrip }
          seeAllTrips={ this.seeAllTrips }
          seeAllMyTrips={ this.seeAllMyTrips }
          trips={ this.state.trips }
          createPost={ this.createPost }
        />
        <Body
          trip={ this.state.trip }
          trips={ this.state.trips }
          showTrip={ this.state.showTrip }
          loggedIn={ this.state.loggedIn }
          createTrip={ this.createTrip }
          createPost={ this.createPost }
          currentUserId={ this.state.currentUserId }
          getTrips={ this.getTrips }
          getTrip={ this.getTrip }
          deleteTrip={ this.deleteTrip }
          removeTrip={ this.removeTrip }
          updateTrip={ this.updateTrip }
          tripIdToEdit={ this.tripIdToEdit }
          seeAllTrips={ this.seeAllTrips }
          getMyTrips={ this.getMyTrips }
        />
      </div>
    )
  }
}
