import React, { Component } from 'react'
import CommentCard from '../CommentCard'


export default function CommentContainerContainer(props) {
    render() {
        return (
            <div className="CommentContainer">
                {
                    props.comments.map(comments =>
                        <Comments name={props.comments}  />)
                }
            </div>
        )
    }
}
