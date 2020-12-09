import React, { Component } from 'react'
import TripCard from '../TripCard'

export default class PostCardList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="CardContainer">
                {
                    this.props.user_posts.map(post =>
                        <TripCard name={posts.user_posts} />)
                }
            </div>
        )
    }
}
