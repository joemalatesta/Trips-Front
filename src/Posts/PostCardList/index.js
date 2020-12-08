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
                    this.props.posts.map(post =>
                        <TripCard name={posts.user_posts} />)
                }
            </div>
        )
    }
}
