import notifications from './domain/notifications'
import component from './views/container'
import reducer from './domain/reducer'
import actions from './domain/actions'
import * as constants from './constants'

export default {
  label: 'Продукты',
  path: '/products',
  icon: 'products1',
  roleList: ['user'],
  menu: true,
  notifications,
  component,
  constants,
  reducer,
  actions,
}