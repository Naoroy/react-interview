import React from 'react'
import ReactDOM from 'react-dom'
import Movie from './movie.component'
import { movies$ as movies } from './../movies.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    this.getMovies()
      .then(movies => this.setState({movies}))
  }

  async getMovies() {
    return await movies
  }

  render() {
    return(
    <>
      {
        this.state.movies.slice(0).map(movie => {
          return (
              <Movie key={movie.id} movie={movie}/>
          )
        })
      }
    </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))

