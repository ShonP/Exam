import * as actionTypes from './actionTypes';
const initialState = {
  Locations: []
};
const setLocal = categories => {
  localStorage.setItem('locations', categories);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LOCATIONS: {
      const Locations = localStorage.getItem('locations');
      if (!Locations) return state;
      return { ...state, Locations };
    }

    case actionTypes.REMOVE_LOCATION: {
      const newerLocations = [...state, state.Locations];
      const toRemoveLocations = newerLocations.find(
        x => x._id === action.payload.id
      );
      newerLocations.splice(toRemoveLocations, 1);
      setLocal(newerLocations);
      return { ...state, Locations: newerLocations };
    }

    case actionTypes.ADD_LOCATION: {
      const newerLocations = [...state.Locations, action.payload];
      setLocal(newerLocations);
      return { ...state, Locations: [...state.Locations, action.payload] };
    }

    case actionTypes.UPDATE_LOCATION: {
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
