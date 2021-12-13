import React from 'react'
import ReactDOM from 'react-dom'
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
import Movie from './movie.component'
import { movies$ as movies } from './../movies.js'

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
      searchQuery: ''
    }
    this.search = this.search.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount() {
      movies.then(movies => this.setState({ movies }))
  }

  search(e) {
    this.setState({ searchQuery: e.target.value })
  }

  deleteMovie(id) {
    this.setState({
      movies: this.state.movies.filter(m => m.id != id)
    })
  }

  render() {
    return(
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
        this.state.movies.slice(0).map(movie => {
          return (
            <Movie
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

/*
class Wrapper extends React.Component {
  render() {
    return (<Provider store={store}> <App /> </Provider>)
  }
}
*/

ReactDOM.render(<App />, document.querySelector('#app'))

