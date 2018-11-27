import {makeType} from '../../../utils'
import {instance, actionTypes} from '../constants'


export const fetchCurrencies = () => ({
  type: makeType(instance, actionTypes.fetchCurrencies, true),
  meta: {url: 'currencies'}
})

export const fetchCountries = () => ({
  type: makeType(instance, actionTypes.fetchCountries, true),
  meta: {url: 'suppliers/countries'}
})

export const fetchSuppliers = (index, country) => ({
  type: makeType(instance, actionTypes.fetchSuppliers, true),
  meta: {url: 'suppliers',
    params: {
      country: typeof country === 'string' ? country : Object.keys(country)
      .sort((a, b) => a - b)
      .reduce((acc, index) => {
        if (/^\d+$/.test(index)) acc.push(country[index])
        return acc
      }, [])
      .join('')
    }
  },
  index
})



export default {
  fetchCurrencies,
  fetchCountries,
  fetchSuppliers
}
