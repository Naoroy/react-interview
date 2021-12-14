import React from 'react'
import ReactDOM from 'react-dom'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import Movie from './movie.component'
import { movies$ as movies } from './../movies.js'
import Button from 'react-bootstrap/Button'

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
      searchQueries: [],
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

  search(category) {
    let sq = this.state.searchQueries
    let i = sq.indexOf(category)
    let newSearchQueries = i != -1 ? [ ...sq.slice(0,i), ...sq.slice(i+1) ] : [ ...sq, category ]

    this.setState({ searchQueries: newSearchQueries })
  }

  deleteMovie(id) {
    this.setState({
      movies: this.state.movies.filter(m => m.id != id)
    })
  }

  render() {
    return(
    <>
      <MultiSelect search={this.search} category={this.state.categories}/>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
          this.state.filteredMovies.slice(0)
          .filter(m => {
            if (this.state.searchQueries.length == 0) { return true }
            return this.state.searchQueries.indexOf(m.category) != -1
          })
          .map(movie => {
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

class MultiSelect extends React.Component {
  constructor(props) {
    super(props)
    this.toggleActive = this.toggleActive.bind(this)
  }
  toggleActive(e, category) {
    e.target.classList.toggle('active')
    this.props.search(category)
  }
  render () {
    return (
      <>
        {
          this.props.category.map(c => {
            return (
              <Button 
                style={{ borderRadius: '2rem 2rem', margin: '1rem' }}
                variant='outline-dark'
                onClick={(e) => this.toggleActive(e, c)}
              >
              {c}
              </Button>
            )
          })
        }
      </>
    )
  }

}

/*
class Wrapper extends React.Component {
  render() {
    return (<Provider store={store}> <App /> </Provider>)
  }
}
*/

ReactDOM.render(<App />, document.querySelector('#app'))

