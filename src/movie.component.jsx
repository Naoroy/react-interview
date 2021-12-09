import React, { Component } from 'react'
import style from './movie.module.css' 
import 'bootstrap/dist/css/bootstrap.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'


class Movie extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const movie = this.props.movie
    return (
      <div className={style['movie-card']}>
        <p className={style['category']}>{movie.category}</p>
        <h2>{movie.title}</h2>
        <LikeBar likes={movie.likes} dislikes={movie.dislikes} />
      </div>
    )
  }
}

class LikeBar extends Component {
  constructor(props) {
    super(props)
    this.total = this.props.likes + this.props.dislikes
    this.likesInPercents = this.props.likes * 100 / this.total
    this.dislikesInPercents = this.props.dislikes * 100 / this.total
  }

  render() {
    return (
      <>
        <ProgressBar>
          <ProgressBar variant="success" now={this.likesInPercents} label={"Like"} key={1}/>
          <ProgressBar variant="danger" now={this.dislikesInPercents} label={"Dislike"} key={2}/>
        </ProgressBar>
      </>
    )
  }
}

export default Movie
