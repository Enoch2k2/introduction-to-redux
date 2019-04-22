# REDUX FLOW

## Syntax

### Map State To Props
We use map state to props in order to get exact values from the redux state. It becomes accessible in our component as props.

```
mapStateToProps = state => {
  return {
    propName: state.keyOfStateOfReducer
  }
}

example:

mapStateToProps = state => {
  movies: state.movies
}
```

### Connect
We import in the function connect from `react-redux`. This allows us to turn our component into a connected component. A connected component is a component that is connected and pulling data from the redux store.

```
connect(mapStateToProps, mapDispatchToProps)(Component)
```

### Dispatch
The store also has a global dispatch that we can use in order to connect to the reducers. We dispatch objects we call actions in order to route to specific logic with an `action.type` and we can also bring in any data as well. Your actions can have any keys the developer wants to give it. As long as they match in the reducer.

```
dispatch({type: "ADD_TODO", todo: {title: "Take a break from coding", completed: "never!"}})
```

### Actions (functions)
We also call functions actions. These actions are designed to create an object that we send our reducers.
```
function fetchMovies(){
  return {
    type: "GET_MOVIES"
  }
}

dispatch(fetchMovies());


later on with Rails...

function fetchMovies(){
  return dispatch => {
    dispatch({type: "LOADING"});
    return fetch("/movies")
      .then(resp => resp.json())
      .then(movies => dispatch({type: "GET_MOVIES", payload: movies}))
  }
}

Will discuss this at a later study group ^^^
```

## Redux Flow
Without Rails Api
```
connect -> mapDispatchToProps -> Action -> Reducer -> store updates state -> props are updated in component
```

With Rails Api
```
connect -> mapDispatchToProps -> Action -> Rails API -> Back to Action -> Reducer -> store updates state -> props updated in component
```