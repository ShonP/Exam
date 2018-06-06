import * as actionTypes from './actionTypes';
const initialState = {
  Categories: []
};

const setLocal = categories => {
  localStorage.setItem('categories', categories);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES: {
      const Categories = localStorage.getItem('categories');
      if (!Categories) return state;
      return { ...state, Categories };
    }

    case actionTypes.REMOVE_CATEGORY: {
      const newerCategories = [...state, state.Categories];
      const toRemoveCategory = newerCategories.find(
        x => x._id === action.payload.id
      );
      newerCategories.splice(toRemoveCategory, 1);
      setLocal(newerCategories);
      return { ...state, Categories: newerCategories };
    }

    case actionTypes.ADD_CATEGORY: {
      const newerCategories = [...state.Categories, action.payload];
      setLocal(newerCategories);
      return { ...state, newerCategories };
    }

    case actionTypes.UPDATE_CATEGORY: {
      const newerCategories = [...state, state.Categories];
      const toRemoveCategory = newerCategories.find(
        x => x._id === action.payload.id
      );
      newerCategories.splice(toRemoveCategory, 1, action.payload);
      setLocal(newerCategories);
      return { ...state, Categories: newerCategories };
    }

    default:
      return state;
  }
};
export default reducer;
