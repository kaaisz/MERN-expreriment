// this is for initializing authorization
const initialState = {
  isAuthenticated: false,
  user: {},
}

// every reducers is gonna export FUNCTION
// in this case, function is gonna take the initial state
export default function(state = initialState, action) {
  // below is writing down just a standard javascript:
  switch(action.type) {
    default: 
      return state;
  }
}