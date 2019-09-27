import { actionChannel, take, fork, call, put } from 'redux-saga/effects';
import axios from '../axios';

const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

function* dispatchPending(actionType, action, payload) {
  yield put({ type: `${actionType}_PENDING`, actualAction: action, payload });
}

function* dispatchSuccess(action, response) {
  yield put({ type: `${action.payload.action}_SUCCESS`, actualAction: action, payload: { data: response.data } });
}

function* dispatchFailed(actionType, action, error) {
  yield put({ type: `${actionType}_FAILED`, actualAction: action, payload: { response: error } });
}

function* invokeAPI(action) {

  const { payload } = action;
  const { method, url, data, apiConfig } = payload;

  try {

    yield* dispatchPending(payload.action, action, payload);

    let response = {};
    const api = axios;

    switch (method) {

      case API_METHOD.GET: {
        response = yield call([api, api.get], url, { ...apiConfig });
        break;
      }
      case API_METHOD.POST:
        response = yield call([api, api.post], url, data, { ...apiConfig });
        break;

      case API_METHOD.PUT:
        response = yield call([api, api.put], url, data, { ...apiConfig });
        break;

      case API_METHOD.DELETE:
        response = yield call([api, api.delete], url, { data }, { ...apiConfig });
        break;

      default:
        throw new Error(`API method ${method} is not supported!`);
    }

    yield* dispatchSuccess(action, response);
    if (apiConfig && apiConfig.resolve) {
      apiConfig.resolve(response.data);
    }
  } catch (error) {
    yield* dispatchFailed(payload.action, action, error);
    if (apiConfig && apiConfig.reject) {
      apiConfig.reject(error);
    }
  }
}

function* asynActionSaga() {
  const actionQueue = yield actionChannel('API_INVOCATION');
  const action = yield take(actionQueue);
  yield fork(invokeAPI, action);
}

export default asynActionSaga;