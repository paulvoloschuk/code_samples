import {makeType, createReducer, createCommonReactions} from '../../../utils'
import {actionStatus} from '../../../utils/constants'
import {instance, actionTypes} from '../constants'

// Destructuring
const type = (...args) => makeType(instance, ...args),
      {request, success, fail} = actionStatus,
      {fetchCurrencies, fetchCountries, fetchSuppliers} = actionTypes

// Local constants
const initialState = {
  edit: {},
  add: {},
  remove: {},
  currencies: {},
  countries: {},
  suppliers: {},
  supply: {},
  // filters: {},
  // sort: {}
}

const reactions = {
  // Common reactions
  ...createCommonReactions(instance),
  // Fetch currencies
  [type(fetchCurrencies, request)]:
    ({state}) => ({...state, currencies: {loading: true}}),
  [type(fetchCurrencies, success)]:
    ({state, payload}) => ({...state, currencies: {data: payload}}),
  [type(fetchCurrencies, fail)]:
    ({state, payload}) => ({...state, currencies: {errors: payload}}),
  // Fetch countries
  [type(fetchCountries, request)]:
    ({state}) => ({...state, countries: {loading: true}}),
  [type(fetchCountries, success)]:
    ({state, payload}) => ({...state, countries: {data: payload}}),
  [type(fetchCountries, fail)]:
    ({state, payload}) => ({...state, countries: {errors: payload}}),
  // Fetch suppliers
  [type(fetchSuppliers, request)]:
    ({state, index}) => ({...state, suppliers: {...state.suppliers, [index]: {loading: true}}}),
  [type(fetchSuppliers, success)]:
    ({state, payload, index}) => ({...state, suppliers: {...state.suppliers, [index]: {data: payload}}}),
  [type(fetchSuppliers, fail)]:
    ({state, payload, index}) => ({...state, suppliers: {...state.suppliers, [index]: {errors: payload}}}),

}

// Reducer
export default createReducer({reactions, initialState})

