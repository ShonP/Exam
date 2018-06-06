import * as categoryActions from './category.actions';
const initialState = {
  Categories: []
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
      return { ...state, Categories: newerCategories };
    }

    case categoryActions.ADD_CATEGORY:
      return { ...state, Categories: [...state.Categories, action.payload] };

    case categoryActions.UPDATE_CATEGORY: {
      const newerCategories = [...state, state.Categories];
      const toRemoveCategory = newerCategories.find(
        x => x._id === action.payload.id
      );
      newerCategories.splice(toRemoveCategory, 1, action.payload);
      return { ...state, Categories: newerCategories };
    }

    default:
      return state;
  }
};
export default reducer;
