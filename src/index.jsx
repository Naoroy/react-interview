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
      searchQueries: [],
      categories: [],
      moviesPerPage: 0,
      moviesPerPagesOption: [ 4, 8, 12 ],
      currentPage: 1,
      pageCount: 0
    }
    this.search = this.search.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.setMoviesPerPage = this.setMoviesPerPage.bind(this)
    this.selectPage = this.selectPage.bind(this)
  }

  componentDidMount() {
    movies.then(movies => {
      let categories = []
      movies.forEach(m => {
        if (categories.indexOf(m.category) == -1) {
          categories.push(m.category)
        }
      })

      this.setState({
        movies,
        categories,
        moviesPerPage: this.state.moviesPerPagesOption[0],
      })
      this.setState({
        pageCount: this.getPageCount()
      })
    })
  }

  getPageCount() {
    return Math.ceil(this.state.movies.length / this.state.moviesPerPage) || 1
  }

  search(category) {
    let sq = this.state.searchQueries
    let i = sq.indexOf(category)
    let newSearchQueries = i != -1 ? [ ...sq.slice(0,i), ...sq.slice(i+1) ] : [ ...sq, category ]

    this.setState({ searchQueries: newSearchQueries })
  }

  deleteMovie(id) {
    this.setState({
      movies: this.state.movies.filter(m => m.id != id),
      pageCount: this.getPageCount()
    })
  }

  setMoviesPerPage (e) {
    const moviesPerPage = Number(e.target.value)
    this.setState({ moviesPerPage, pageCount: this.getPageCount() })
  }

  selectPage(option) {
    let page
    if (option == 'next') {
      page = this.state.currentPage + 1
      if (page > this.state.pageCount) {
        page = this.state.pageCount
      }
    }
    else {
      page = this.state.currentPage - 1
      if (page < 1) {
        page = 1
      }
    }
    this.setState({ currentPage: page })
  }

  render() {
    let currentPage = this.state.currentPage
    let moviesPerPage = this.state.moviesPerPage

    return(
    <>
      <MultiSelect search={this.search} category={this.state.categories}/>
      <MoviePerPageSelect
        moviesPerPagesOption={this.state.moviesPerPagesOption}
        setMoviesPerPage={this.setMoviesPerPage}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
          this.state.movies
          .filter(m => {
            if (this.state.searchQueries.length == 0) { return true }
            return this.state.searchQueries.indexOf(m.category) != -1
          })
          .slice((currentPage - 1) * moviesPerPage, (currentPage * moviesPerPage))
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
      <PageSelect
        prevPage={() => this.selectPage('prev')}
        nextPage={() => this.selectPage('next')}
        currentPage={this.state.currentPage}
        pageCount={this.state.pageCount}
      />
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
                key={c}
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

class MoviePerPageSelect extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <>
        <label htmlFor="pages">Résultat par pages</label>
        <select id="pages" name="pages" onChange={this.props.setMoviesPerPage} >
          {
            this.props.moviesPerPagesOption
              .map(p => (<option key={p} value={p}>{p}</option>))
          }
        </select>
      </>
    )
  }
}

class PageSelect extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Button onClick={this.props.prevPage}>&#60;</Button>
        <Button onClick={this.props.nextPage}>&#62;</Button>
        <p>Page {this.props.currentPage}/{this.props.pageCount}</p>
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

