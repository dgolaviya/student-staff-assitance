import { FETCH_ACTIVITIES_SUCCESS } from '../actions/types';

const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ACTIVITIES_SUCCESS: {
      return [
        ...state,
        ...payload.data.data
      ]
    }

    default:
      return state
  }
}
