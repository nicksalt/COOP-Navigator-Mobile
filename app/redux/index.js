import { combineReducers } from "redux";
import qs from "qs";
import { LOGIN_URI, JOBS_URI, PROFILE_URI } from "../utils/constants";

//action types
const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";
const SAVE_SEARCH_PREF = "SAVE_SEARCH_PREF";
const SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS";
const RECEIVE_JOBS = "RECEIVE_JOBS";
const REQUEST_JOBS = "REQUEST_JOBS";
const ERROR_OCCURRED = "ERROR_OCCURRED";
const REQUEST_SINGLE_JOB = "REQUEST_SINGLE_JOB";
const RECEIVE_SINGLE_JOB = "RECEIVE_SINGLE_JOB";
const REQUEST_PROFILE = "REQUEST_PROFILE";
const RECEIVE_PROFILE = "RECEIVE_PROFILE";
const REQUEST_JOB_APPLICATIONS = "FETCH_JOB_APPLICATIONS";
const RECEIVE_JOB_APPLICATIONS = "RECEIVE_JOB_APPLICATIONS";
const ATTEMPT_JOB_APPLICATION = "ATTEMPT_JOB_APPLICATION";
const JOB_APPLICATION_SUCCESSFUL = "JOB_APPLICATION_SUCCESSFUL";
const JOB_APPLICATION_FAILED = "JOB_APPLICATION_FAILED";
const REQUEST_INTERVIEWS = "REQUEST_INTERVIEWS";
const RECEIVE_INTERVIEWS = "RECEIVE_INTERVIEWS";

//action creators
export function attemptLogin() {
  return {
    type: ATTEMPT_LOGIN
  };
}

export function loginSuccess(studentId) {
  return {
    type: LOGIN_SUCCESS,
    studentId
  };
}

export function loginFail(loginError) {
  return {
    type: LOGIN_FAIL,
    loginError
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function saveSearchPref(searchPref) {
  return {
    type: SAVE_SEARCH_PREF,
    searchPref
  };
}

export function setSearchParams(searchParams) {
  return {
    type: SET_SEARCH_PARAMS,
    searchParams
  };
}

export function requestJobs() {
  return {
    type: REQUEST_JOBS
  };
}

export function receiveJobs(jobs) {
  return {
    type: RECEIVE_JOBS,
    jobs,
    receivedAt: Date.now()
  };
}

export function requestSingleJob(jobId) {
  return {
    type: REQUEST_SINGLE_JOB,
    jobId
  };
}

export function receiveSingleJob(job) {
  return {
    type: RECEIVE_SINGLE_JOB,
    job
  };
}

export function requestProfile() {
  return {
    type: REQUEST_PROFILE
  };
}

export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile
  };
}

export function errorOccurred(err) {
  return {
    type: ERROR_OCCURRED,
    err
  };
}

export function requestJobApplications() {
  return {
    type: REQUEST_JOB_APPLICATIONS
  };
}

export function receiveJobApplications(jobs) {
  return {
    type: RECEIVE_JOB_APPLICATIONS,
    jobs
  };
}

export function attemptJobApplication(studentId, jobId) {
  return {
    type: ATTEMPT_JOB_APPLICATION,
    studentId,
    jobId
  };
}

export function jobApplicationSuccessful() {
  return {
    type: JOB_APPLICATION_SUCCESSFUL
  };
}

export function jobApplicationFailed(err) {
  return {
    type: JOB_APPLICATION_FAILED,
    err
  };
}

export function requestInterviews() {
  return {
    type: REQUEST_INTERVIEWS
  };
}

export function receiveInterviews(interviews) {
  return {
    type: RECEIVE_INTERVIEWS,
    interviews
  };
}

//thunk action creators
export function login(email, password) {
  return (dispatch, getState) => {
    dispatch(attemptLogin());
    fetch(LOGIN_URI, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error("Incorrect username or password.");
        }
        return res;
      })
      .then(checkClientError)
      .then(res => res.text())
      .then(studentId => {
        if (!studentId) throw new Error("Could not find student ID");
        dispatch(loginSuccess(studentId));
      })
      .then(() => dispatch(fetchProfile()))
      .catch(err => dispatch(loginFail(err)));
  };
}

export function fetchJobs() {
  return (dispatch, getState) => {
    const searchParams = getState().jobSearch.searchParams;
    if (!searchParams) {
      throw new Error("Search Params not set");
    }
    dispatch(requestJobs());
    const query = JOBS_URI + "?" + qs.stringify(searchParams);
    return fetch(query)
      .then(checkClientError)
      .then(res => res.json())
      .then(json => dispatch(receiveJobs(json)))
      .catch(err => dispatch(errorOccurred(err)));
  };
}

export function fetchSingleJob(number) {
  return dispatch => {
    dispatch(requestSingleJob(number));
    return fetch(JOBS_URI + "/" + number)
      .then(checkClientError)
      .then(res => res.json())
      .then(json => dispatch(receiveSingleJob(json)))
      .catch(err => dispatch(errorOccurred(err)));
  };
}

export function fetchProfile() {
  return (dispatch, getState) => {
    dispatch(requestProfile());
    const studentId = getState().profile.studentId;
    return fetch(PROFILE_URI + "/" + studentId)
      .then(checkClientError)
      .then(res => res.json())
      .then(json => dispatch(receiveProfile(json)))
      .catch(err => dispatch(errorOccurred(err, "PROFILE")));
  };
}

export function fetchJobApplications() {
  return (dispatch, getState) => {
    dispatch(requestJobApplications());
    const studentId = getState().profile.studentId;
    const query = `${PROFILE_URI}/${studentId}/jobs`;
    return fetch(query)
      .then(checkClientError)
      .then(res => res.json())
      .then(json => dispatch(receiveJobApplications(json)))
      .catch(err => dispatch(errorOccurred(err)));
  };
}

export function createJobApplication(jobId) {
  return (dispatch, getState) => {
    const studentId = getState().profile.studentId;
    dispatch(attemptJobApplication(studentId, jobId));
    const url = `${PROFILE_URI}/${studentId}/jobs`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ jobId }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(res => {
        if (res.status === 409) {
          throw new Error("You already applied for this job.");
        }
        return res;
      })
      .then(checkClientError)
      .then(res => dispatch(jobApplicationSuccessful()))
      .catch(err => dispatch(jobApplicationFailed(err)));
  };
}

export function fetchInterviews() {
  return (dispatch, getState) => {
    dispatch(requestInterviews());
    const studentId = getState().profile.studentId;
    const query = `${PROFILE_URI}/${studentId}/interviews`;
    return fetch(query)
      .then(checkClientError)
      .then(res => res.json())
      .then(json => {
        json.sort((i1, i2) => i1.date.localeCompare(i2.date));
        dispatch(receiveInterviews(json));
      })
      .catch(err => dispatch(errorOccurred(err)));
  };
}

//error handlers
const checkClientError = res => {
  if (res.ok) return res;
  switch (res.status) {
    case 404:
      throw new Error("404 Not Found");
    default:
      throw new Error("An error occurred. Status: " + res.status);
  }
};

//reducers
function searchPrefReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_SEARCH_PREF:
      return Object.assign({}, state, action.searchPref);
    default:
      return state;
  }
}

function jobsSearchReducer(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_PARAMS:
      return Object.assign({}, state, {
        searchParams: action.searchParams
      });
    case REQUEST_JOBS:
      return Object.assign({}, state, {
        isFetching: true,
        errorOccurred: false
      });
    case RECEIVE_JOBS:
      return Object.assign({}, state, {
        isFetching: false,
        jobs: action.jobs,
        lastUpdated: action.receivedAt
      });
    case ERROR_OCCURRED:
      return Object.assign({}, state, {
        isFetching: false,
        errorOccurred: true,
        error: action.err
      });
    default:
      return state;
  }
}

function jobSummaryReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_SINGLE_JOB:
      return Object.assign({}, state, {
        isFetching: true,
        errorOccurred: false,
        jobId: action.jobId
      });
    case RECEIVE_SINGLE_JOB:
      return Object.assign({}, state, {
        isFetching: false,
        job: action.job,
        lastUpdated: action.receivedAt
      });
    case ERROR_OCCURRED:
      return Object.assign({}, state, {
        isFetching: false,
        errorOccurred: true,
        error: action.err
      });
    default:
      return state;
  }
}

//once login is implemented, RECEIVE_PROFILE should prob be part of login
function profileReducer(state = {}, action) {
  switch (action.type) {
    case ATTEMPT_LOGIN:
      return {
        attemptingLogin: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        attemptingLogin: false,
        isLoggedIn: true,
        studentId: action.studentId
      };
    case LOGIN_FAIL:
      return {
        ...state,
        attemptingLogin: false,
        isLoggedIn: false,
        loginError: action.loginError
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        studentProfile: null,
        studentId: null
      };
    case REQUEST_PROFILE:
      return {
        ...state,
        isFetching: true,
        errorOccurred: false
      };
    case RECEIVE_PROFILE:
      return {
        ...state,
        isFetching: false,
        studentProfile: action.profile
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        isFetching: false,
        errorOccurred: true,
        error: action.err
      };
    default:
      return state;
  }
}

function jobApplicationReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_JOB_APPLICATIONS:
      return {
        ...state,
        isFetching: true,
        errorOccurred: false
      };
    case RECEIVE_JOB_APPLICATIONS:
      return {
        ...state,
        isFetching: false,
        jobs: action.jobs
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        isFetching: false,
        errorOccurred: true,
        error: action.err
      };
    case ATTEMPT_JOB_APPLICATION:
      return {
        ...state,
        isApplying: true
      };
    case JOB_APPLICATION_SUCCESSFUL:
      return {
        ...state,
        isApplying: false,
        applicationSuccessful: true
      };
    case JOB_APPLICATION_FAILED:
      return {
        ...state,
        isApplying: false,
        applicationFailed: true,
        error: action.err
      };
    default:
      return state;
  }
}

function interviewsReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_INTERVIEWS:
      return {
        ...state,
        isFetching: true,
        errorOccurred: false
      };
    case RECEIVE_INTERVIEWS:
      return {
        ...state,
        isFetching: false,
        interviews: action.interviews
      };
    case ERROR_OCCURRED:
      return {
        ...state,
        isFetching: false,
        errorOccurred: true,
        error: action.err
      };
    default:
      return state;
  }
}
export const rootReducer = combineReducers({
  profile: profileReducer,
  jobSearch: jobsSearchReducer,
  searchPref: searchPrefReducer,
  jobSummary: jobSummaryReducer,
  jobApplication: jobApplicationReducer,
  interviews: interviewsReducer
});
