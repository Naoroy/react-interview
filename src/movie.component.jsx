import React, { Component } from 'react'
import style from './movie.module.css' 
import 'bootstrap/dist/css/bootstrap.css'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'


class Movie extends Component {
  constructor(props) {
    super(props)
    this.total = this.props.likes + this.props.dislikes
    this.likesInPercents = (this.props.likes * 100 / this.total).toFixed(2)
    this.dislikesInPercents = (this.props.dislikes * 100 / this.total).toFixed(2)
  }

  render() {
    const movie = this.props.movie
    return (
      <div className={`${this.props.hidden?'hide':''} ${style.movieCard}`}>
        <div className={'d-flex justify-content-between'}>
          <p className={style.category}>{movie.category}</p>
          <Button
            className={style.deleteBtn}
            onClick={()=> { this.props.deleteMovie(movie.id) }}
            variant="danger">
          </Button>
        </div>
        <h2>{movie.title}</h2>
        <LikeBar
          likes={movie.likes}
          dislikes={movie.dislikes}
        />
      </div>
    )
  }
}

class LikeBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false,
      isDisliked: false,
      hasBeenRated: false
    }
  }

  ratio(v, t) {
    return (v * 100 / t).toFixed(2)
  }

  toggleLike() {
    this.setState({
      isLiked: !this.state.isLiked,
      isDisliked: false,
      hasBeenRated: true
    })
  }

  toggleDislike() {
    this.setState({
      isLiked: false,
      isDisliked: !this.state.isDisliked,
      hasBeenRated: true
    })
  }

  render() {
    let l = this.props.likes
    let d = this.props.dislikes
    let likes = this.ratio(l, l + d)
    let dislikes = this.ratio(d, l + d)

    return (
      <>
        <div className="d-flex justify-content-center fg-2 mb-2">
          <Button
            className={`mx-2 ${this.state.isLiked ? 'active': ''}`}
            variant="outline-success"
            onClick={() => {
              this.toggleLike()
            }}
          >
            Like
          </Button>
          <Button
            className={`mx-2 ${this.state.isDisliked ? 'active': ''}`}
            variant="outline-danger"
            onClick={() => {
              this.toggleDislike()
            }}
          >
            Dislike
          </Button>
        </div>
        <ProgressBar>
          <ProgressBar
            variant="success"
            now={likes}
            label={likes + "%"}
            key={1}
          />
          <ProgressBar
            variant="danger"
            now={dislikes}
            label={dislikes + "%"} 
            key={2}
          />
        </ProgressBar>
      </>
    )
  }
}

export default Movie
