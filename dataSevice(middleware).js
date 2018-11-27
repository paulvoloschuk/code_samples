import axios from 'axios'
import {actionStatus as status} from '../utils/constants'

// Axios instance
const {HTTPS, CUSTOM_HOST, API_PATH} = process.env

export const API = axios.create({
  baseURL: `${HTTPS}://${CUSTOM_HOST}/${API_PATH}`,
  responseType: 'json',
  timeout: 10000,
})

const DEFAULT_CALLBACKS = {
  onSuccess: ({data}) => ({payload: data}),
  onFail: response => ({payload: response})
}

// Middleware
export default ({getState, dispatch}) => next => ({type, payload, meta, ...rest}) => {
  if (type.endsWith(status.request) && type.startsWith('@')) {
    const {onSuccess, onFail, ...options} = {...DEFAULT_CALLBACKS, ...meta},
          {auth: {token}} = getState(),
          [instance] = type.slice(1).split('/')

    // Check if everything is accessible
    if (typeof onSuccess !== 'function' || typeof onFail !== 'function')
      throw new Error('DataService: expecting callbacks(onError, onSuccess) to be a functions')

    // Start request
    API({
      ...options,
      url: options.url || instance,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(response => setTimeout(() => dispatch({
        type: type.replace(status.request, status.success),
        ...rest,
        ...onSuccess(response)
      }), 500))
      // TODO: improve status processing
      .catch(({response}) => dispatch({
        type: type.replace(status.request, status.fail),
        ...rest,
        ...onFail(response || {status: 408}) // TODO: errors processing
      }))
  }
  next({type, payload, meta, ...rest})
}