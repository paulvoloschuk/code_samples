import React, {Component, Fragment} from 'react'
import {Table, Caption, Button,  Modal, Badge, PreLoader, Label} from '../../../ui-kit'
import {reduxForm} from 'redux-form'
import {statuses} from '../constants'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import storeMap from '../domain/storeMap'
import Editor from './editor'

/* Constants =============================================================== */
const INIT_VALUES = {status: 'active'},
      AddForm = reduxForm({form: `AddProduct`})(Editor),
      EditForm = reduxForm({form: `EditProduct`})(Editor)


/* Container =============================================================== */
@connect(...storeMap)
export default class Index extends Component {

  componentWillMount = () => this.props.fetchAll()

  render () {
    const {
      data, edit, add, currencies, countries, suppliers, fetch, fetchAll, disable, remove, select,
      clear, fillStart, create, update, fetchCurrencies, fetchCountries, fetchSuppliers, loading,
    } = this.props
    return (
      <Fragment>
        <Helmet>
          <title>Продукты {loading ? data ? ': Обновление...' : ': Загрузка...' : ''}</title>
        </Helmet>
        <Caption margin level="2">
          Продукты
          {data && loading && <Label inline margin type="hint">Обновляется...</Label>}
        </Caption>
        {data && (
          <Table.Container grow onSelect={select}>
            <Table.Panel>
              <Button size="tiny" disabled={add.filling} onClick={fillStart}>Добавить +</Button>
            </Table.Panel>
            <Table.Head>
              <Table.Row>
                <Table.Cell colName="id">
                  ID
                </Table.Cell>
                <Table.Cell colName="product">
                  Продукт
                </Table.Cell>
                <Table.Cell colName="status">
                  Статус
                </Table.Cell>
                <Table.Cell colName="countries">
                  Страны
                </Table.Cell>
                <Table.Cell colName="suppliers">
                  Поставщики
                </Table.Cell>
                <Table.Cell colName="actions">
                  Действия
                </Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data.map(({id, name, status, suppliers}) => {
                const {color, title} = statuses.find(item => item.value === status)
                return (
                  <Table.Row key={id} selectValue={id}>
                    <Table.Cell colName="id">
                      {id}
                    </Table.Cell>
                    <Table.Cell colName="product">
                      {name}
                    </Table.Cell>
                    <Table.Cell colName="status">
                      <Badge {...{color}}>{title}</Badge>
                    </Table.Cell>
                    <Table.Cell colName="countries">
                      {(suppliers && suppliers.length)
                        ? suppliers.map(item => item.country_name).unique().join(', ')
                        : '-'
                      }
                    </Table.Cell>
                    <Table.Cell colName="suppliers">
                      {(suppliers && suppliers.length)
                        ? suppliers.map(item => item.supplier_name).unique().join(', ')
                        : '-'
                      }
                    </Table.Cell>
                    <Table.Cell colName="actions">
                      <Table.Action icon="edit" processing={edit.id === id} onClick={fetch(id)}/>
                      <Table.Action icon="trash" processing={remove.id === id && remove.sending} onClick={disable(id)}/>
                    </Table.Cell>
                  </Table.Row>
                )})}
            </Table.Body>
          </Table.Container>
        )}
        {!data && loading && <PreLoader grow label="Загрузка пользователей"/>}
        <Modal
          open={add.filling}
          title="Добавление продукта"
          width={550}
          onClose={clear}
          afterClose={fetchAll}
        >
          <AddForm
            actionTitle="Добавить"
            initialValues={INIT_VALUES}
            onClose={clear}
            onSubmit={create}
            data={{statuses, currencies, countries, suppliers}}
            actions={{fetchCurrencies, fetchCountries, fetchSuppliers}}
            sending={add.sending}
          />
        </Modal>
        <Modal
          open={edit.data}
          width={550}
          title="Редактирование продукта"
          onClose={clear}
          afterClose={fetchAll}
        >
          <EditForm
            actionTitle="Редактировать"
            initialValues={edit.data}
            onClose={clear}
            onSubmit={update(edit.id)}
            data={{statuses, currencies, countries, suppliers}}
            actions={{fetchCurrencies, fetchCountries, fetchSuppliers}}
            sending={edit.sending}
          />
        </Modal>
      </Fragment>
    )
  }
}
