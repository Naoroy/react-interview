import React, { Component } from 'react'


class Movie extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const movie = this.props.movie
    return (
      <>
        <p>
          <b>{movie.title}</b>
        </p>
        <p>
          genre: {movie.category}
        </p>
        <p>
          likes: {movie.likes}
        </p>
        <p>
          dislikes: {movie.dislikes}
        </p>
      </>
    )
  }
}


export default Movie
