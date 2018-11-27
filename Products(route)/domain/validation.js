import {required} from '../../../utils/create-validations'


export default {
  name: [
    required('Введите название')
  ],
  status: [
    required('Выберите статус')
  ],
  formFactor: [
    required('Введите форм-фактор')
  ],
  locale: [
    required('Введите локаль')
  ],
  width: [
    required('Введите ширину')
  ],
  length: [
    required('Введите длину')
  ],
  height: [
    required('Введите высоту')
  ],
  weight: [
    required('Введите вес')
  ],
  type: [
    required('Введите тип')
  ],
  value: [
    required('Введите значение')
  ],
  currency: [
    required('Введите валюту')
  ],
  country: [
    required('Выберите страну'),
  ],
  price: [
    required('Введите цену продукта без НДС')
  ],
  supplier: [
    required('Выберите поставщика')
  ],
  stock: [
    required('Введите запас')
  ],
  currencies: [
    required('Выберите валюту')
  ],
  amount: [
    required('Введите количество единиц за одну поставку')
  ],

}