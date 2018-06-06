import * as categoryActions from './category.actions';
const initialState = {
  Categories: []
};

const setLocal = categories => {
  localStorage.setItem('categories', categories);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryActions.SET_CATEGORIES:
      return { ...state, Categories: action.payload };

    case categoryActions.REMOVE_CATEGORY: {
      const newerCategories = [...state, state.Categories];
      const toRemoveCategory = newerCategories.find(
        x => x._id === action.payload.id
      );
      newerCategories.splice(toRemoveCategory, 1);
      setLocal(newerCategories);
      return { ...state, Categories: newerCategories };
    }

    case categoryActions.ADD_CATEGORY: {
      const newerCategories = [...state.Categories, action.payload];
      setLocal(newerCategories);
      return { ...state, newerCategories };
    }

    case categoryActions.UPDATE_CATEGORY: {
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
