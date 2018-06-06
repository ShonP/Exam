import * as locationActions from './location.actions';
const initialState = {
  Locations: []
};
const setLocal = categories => {
  localStorage.setItem('locations', categories);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case locationActions.SET_LOCATIONS:
      return { ...state, Locations: action.payload };

    case locationActions.REMOVE_LOCATION: {
      const newerLocations = [...state, state.Locations];
      const toRemoveLocations = newerLocations.find(
        x => x._id === action.payload.id
      );
      newerLocations.splice(toRemoveLocations, 1);
      setLocal(newerLocations);
      return { ...state, Locations: newerLocations };
    }

    case locationActions.ADD_LOCATION: {
      const newerLocations = [...state.Locations, action.payload];
      setLocal(newerLocations);
      return { ...state, Locations: [...state.Locations, action.payload] };
    }

    case locationActions.UPDATE_LOCATION: {
      const newerLocations = [...state, state.Locations];
      const toRemoveLocations = newerLocations.find(
        x => x._id === action.payload.id
      );
      newerLocations.splice(toRemoveLocations, 1, action.payload);
      setLocal(newerLocations);
      return { ...state, Locations: newerLocations };
    }

    default:
      return state;
  }
};

export default reducer;
