import { FETCH_ACTIVITIES_SUCCESS } from '../actions/types';

const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ACTIVITIES_SUCCESS: {
      const activities = payload.data.data;
      activities.sort((a, b) => {
        var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
        return dateB - dateA;
      })
      return [
        ...activities
      ]
    }

    default:
      return state
  }
}
