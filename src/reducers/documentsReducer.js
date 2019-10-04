import isEmpty from "is-empty";
import {
  FETCH_DOCUMENTS_PENDING,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILED,
  UPDATE_DOCUMENT_FAILED,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_PENDING,
  CREATE_DOCUMENT_FAILED,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_PENDING
} from "../actions/types";

const initialState = {
  documents: [],
  documentUpdateId: "",
  isDocumentUpdated: false,
  loading: false,
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS_PENDING:
      return {
        ...state,
        loading: true,
        success: false
      };
    case FETCH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: action.payload.data.data,
        loading: false,
        success: true,
        isDocumentUpdated: false
      };
    case FETCH_DOCUMENTS_FAILED:
      return {
        ...state,
        loading: false,
        success: false
      };
    // case CREATE_DOCUMENT_PENDING:
    //   return {
    //     ...state,
    //     loading: true,
    //     success: false
    //   };
    // case CREATE_DOCUMENT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     success: true,
    //     isDocumentUpdated: true
    //   };
    // case CREATE_DOCUMENT_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     success: false
    //   };
    // case UPDATE_DOCUMENT_PENDING:
    //   return {
    //     ...state,
    //     loading: true,
    //     success: false
    //   };
    // case UPDATE_DOCUMENT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     success: true,
    //     isDocumentUpdated: true
    //   };
    // case UPDATE_DOCUMENT_FAILED:
    //   return {
    //     ...state,
    //     loading: false,
    //     success: false
    //   };

    default:
      return state;
  }
}
