export const instance = 'products'

export const actionTypes = {
  fetchCurrencies: 'FETCH_CURRENCIES',
  fetchCountries: 'FETCH_COUNTRIES',
  fetchSuppliers: 'FETCH_SUPPLIERS'
}

export const statuses = [
  {title: 'Активный', value: 'active', color: 'green'},
  {title: 'Приостановлен', value: 'suspended', color: 'red'},
  {title: 'Неактивный', value: 'inactive', color: 'gray'}
]