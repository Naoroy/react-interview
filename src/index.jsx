import React from 'react'
import ReactDOM from 'react-dom'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import Movie from './movie.component'
import { movies$ as movies } from './../movies.js'
import style from './index.module.css'

/* Store start */
/*
function movieInit(movies) {
  return { type: 'INIT', movies }
}

function movieReducer(state = { movies: [], searchQuery: '' }, action) {
  switch (action.type) {
    case 'INIT':
      return { movies: action.movies }
    case 'DELETE':
      return state.movies.filter(m => m.id = action.id)
    default:
      return state
  }
}

const store = createStore(movieReducer)
movies.then(function(movies){
  store.dispatch(movieInit(movies))
})

*/
/* Store end */


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      filteredMovies: [],
      searchQuery: 'Comedy',
      categories: []
    }
    this.search = this.search.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount() {
    movies.then(movies => {
      let categories = []
      movies.forEach(m => {
        if (categories.indexOf(m.category) == -1) {
          categories.push(m.category)
        }
      })
      this.setState({ filteredMovies: movies, movies, categories })
    })
  }

  search(e) {
    let searchQuery = e.target.value
    if (!searchQuery) { return }

    let m = this.state.movies
    let filteredMovies = m.filter(m => {
      return m.category == searchQuery
    })

    this.setState({ filteredMovies, searchQuery })
  }

  deleteMovie(id) {
    this.setState({
      movies: this.state.movies.filter(m => m.id != id)
    })
  }

  render() {
    return(
    <>
      <input
        type="text"
        onChange={this.search}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
          this.state.filteredMovies.slice(0).map(movie => {
            return (
              <Movie
                hidden={movie.hidden}
                key={movie.id}
                movie={movie}
                deleteMovie={(id) => this.deleteMovie(id)}
              />
            )
          })
      }
      </div>
    </>
    )
  }
}

class MultiSelect {

}

/*
class Wrapper extends React.Component {
  render() {
    return (<Provider store={store}> <App /> </Provider>)
  }
}
*/

ReactDOM.render(<App />, document.querySelector('#app'))

