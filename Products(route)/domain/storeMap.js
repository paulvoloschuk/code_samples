import {fetchCurrencies, fetchSuppliers, fetchCountries} from './actions'
import {instance} from '../constants'
import {createCommonActions} from '../../../utils'


const mapStateToProps = state => ({
  ...state[instance]
});

const mapDispatchToProps = dispatch => ({
  ...createCommonActions(instance, dispatch),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchSuppliers: index => locale => dispatch(fetchSuppliers(index, locale))
})

export default [mapStateToProps, mapDispatchToProps]