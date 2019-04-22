// GLOBAL STORE

class Store {
  // reducer gets passed in as a function that will be updating the state of the store
  constructor(reducer) {
    this.reducer = reducer;
    this.state = reducer({type: ""});
    this.connectedComponents = [];
  }
  
  // retrieves the state of the store
  getState = () => {
    return this.state;
  }
  
  // dispatch takes in an action which gets called by any reducers passed in
  dispatch = (action) => {
    this.state = this.reducer(action);

    // added this to reflect changes of all the connected components
    this.updateState();
  }

  // TODO: (FIX SYNC'D PROP UPDATE) syncs the state being mapped to it's connected components. (buggy as now it will add all of state instead of just the ones that is being mapped)
  updateState = () => {
    this.connectedComponents.forEach((component => {
      component.props = {
        ...component.props,
        ...this.getState()
      }
    }))
  }
}

// REDUCER

function movieReducer(action, state = { movies: [] }) {
  // the switch is used to route the action to where it should go by the action.type.
  switch (action.type) {
    case "ADD_MOVIE":
    // we always return a non destructive mimic of an updated state. Should always include all of the key / vals which we use ...state to spread all of the key / vals of the state and then the key and values we want to change.
    return {
      ...state,
      movies: state.movies.concat(action.payload)
    }
    default:
    // by default we always return the default state
    return state;
  }
}

// CREATE OUR STORE FOR REDUX

// we create a new store and pass in the movie reducer as part of the global store's state. (FUTURE TIP: we'll learn how to combine multiple reducers together using combineReducers later this week.)
let store = new Store(movieReducer);

// THE COMPONENTS

// very basic replica of component that we extend from in React
class Component {
  constructor(props) {
    this.props = props;
  }
}

class App extends Component {

}

class AnotherComponent extends Component {
  
}

class NavBar extends Component {

}

// CONNECT COMPONENT TO REDUX STORE
function connect(mapStateToProps) {
  return (klass) => {
    //  instantiate new component
    component = new klass();

    // check if mapStateToProps exist
    if(mapStateToProps) {
      // update the props of the component to include the props being mapped from the store
      component.props = {
        ...component.props,
        ...mapStateToProps(store.getState()) // <---------
      }

      // store knows about the connected components
      store.connectedComponents.includes(component) ? null : store.connectedComponents.push(component);

      // returns the component that was instantiated (connected)
      return component;
    }
  }
}

// MAP VALUES WE WANT AVAILABLE IN COMPONENT FROM STORE
mapStateToProps = state => {
  // state is the same state as store.getState();
  // we return an object of keys that we want as props, and those keys are paired with values we want from the global store.
  return {
    movies: state.movies
  }
}

// Connect the app
let connectedApp = new App();
// these last two components are connected and represent children of the App showing that two components can have the same movies props, and don't have to go through app to get them.
let connectedAnotherComponent = connect(mapStateToProps)(AnotherComponent);
let connectedNavBar = connect(mapStateToProps)(NavBar);