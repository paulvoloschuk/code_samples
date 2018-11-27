import {makeType} from '../../../utils'
import {actionStatus, actionTypes} from '../../../utils/constants'
import {instance} from '../constants'

export default {
  [makeType(instance, actionTypes.create, actionStatus.fail)]:
    ({payload}) => ({
      level: 'error',
      title: 'Ошибка записи',
      message: ({
        400: 'Неверные значения в редакторе'
      })[payload.status] || 'Попробуйте позже'
    }),
  [makeType(instance, actionTypes.update, actionStatus.fail)]:
    ({payload}) => ({
      level: 'error',
      title: 'Ошибка записи',
      message: ({
        400: 'Неверные значения в редакторе'
      })[payload.status] || 'Попробуйте позже'
    }),
}