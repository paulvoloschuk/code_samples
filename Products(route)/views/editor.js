import React, {Fragment, PureComponent} from 'react'
import {Field, FieldArray} from 'redux-form'
import {Section, Caption, Button, Select, Input, DropZone, FlexGrid, SwitchBox, CheckBox, Modal, Tabs, ActionBlock, Dots} from '../../../ui-kit'
import validation from '../domain/validation'


class Editor extends PureComponent {
  componentWillMount() {
    const {actions, initialValues} = this.props
    actions.fetchCurrencies()
    actions.fetchCountries()
    // On update
    if (initialValues.suppliers)
      initialValues.suppliers.forEach(({country}, index) => country && actions.fetchSuppliers(index)(country))
  }

  render() {
    const {onClose, actionTitle, handleSubmit, submitting, pristine, sending, data, actions} = this.props
    return (
      <Tabs>
        <Modal.Header>
          <Tabs.Controls/>
        </Modal.Header>
        <Modal.Content>
          <Tabs.Container>
            <Tabs.Item label="Прототип">
              <Section>
                <Field
                  grow
                  name="status"
                  label="Статус"
                  component={SwitchBox}
                  validate={validation.status}
                  options={data.statuses}
                  // TODO: remove on i18n update
                  disabled={actionTitle === 'Добавить'}
                />
              </Section>
              <Section>
                <Caption margin level="3">Прототип продукта</Caption>
                <FlexGrid.Row borders>
                  <FlexGrid.Cell>
                    <FlexGrid.Column>
                      <FlexGrid.Row>
                        <FlexGrid.Cell>
                          <Field
                            grow
                            name="name"
                            label="Название продукта"
                            component={Input}
                            validate={validation.name}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                      <FlexGrid.Row>
                        <FlexGrid.Cell>
                          <Field
                            grow
                            name="weight"
                            label="Вес (в граммах)"
                            type="number"
                            component={Input}
                            validate={validation.weight}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                      <FlexGrid.Row>
                        <FlexGrid.Cell>
                          <Field
                            grow
                            name="size[2]"
                            label="Длина (в миллиметрах)"
                            type="number"
                            component={Input}
                            validate={validation.length}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                    </FlexGrid.Column>
                  </FlexGrid.Cell>
                  <FlexGrid.Cell>
                    <FlexGrid.Column>
                      <FlexGrid.Row>
                        <FlexGrid.Cell grow="2">
                          <Field
                            grow
                            name="locale"
                            label="Локаль"
                            component={Input}
                            validate={validation.locale}
                          />
                        </FlexGrid.Cell>
                        <FlexGrid.Cell align="flex-end">
                          <Field
                            name="is_brittle"
                            label="Хрупкое"
                            component={CheckBox}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                      <FlexGrid.Row>
                        <FlexGrid.Cell grow="2">
                          <Field
                            grow
                            name="size[0]"
                            label="Ширина (в миллиметрах)"
                            type="number"
                            component={Input}
                            validate={validation.width}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                      <FlexGrid.Row>
                        <FlexGrid.Cell grow="2">
                          <Field
                            grow
                            name="size[1]"
                            label="Высота (в миллиметрах)"
                            type="number"
                            component={Input}
                            validate={validation.height}
                          />
                        </FlexGrid.Cell>
                      </FlexGrid.Row>
                    </FlexGrid.Column>
                  </FlexGrid.Cell>
                </FlexGrid.Row>
              </Section>
              <Section>
                <Caption margin level="3">Дополнительные поля</Caption>
                <FieldArray name="custom_fields" component={ExtraFields}/>
              </Section>
              <Section>
                <Caption margin level="3">Изображения</Caption>
                <Field
                  name="assets"
                  acceptPreset="images"
                  view="gallery"
                  component={DropZone}
                />
              </Section>
            </Tabs.Item>
            <Tabs.Item label="История изменений" disabled>
              <Section>
                ---
              </Section>
            </Tabs.Item>
            <Tabs.Item label="Поставщики">
              <Section>
                <Caption margin level="3">Страны и поставщики</Caption>
                <FieldArray name="suppliers" component={Suppliers} {...{actions, data}}/>
              </Section>
            </Tabs.Item>
          </Tabs.Container>
          <Section>
            <FlexGrid.Row>
              <FlexGrid.Cell grow="0">
                <Button onClick={handleSubmit} disabled={pristine || submitting || sending}>
                  {sending ? <Fragment>Отправка<Dots/></Fragment> : actionTitle}
                </Button>
              </FlexGrid.Cell>
              <FlexGrid.Cell grow="0">
                <Button type="auxiliary" onClick={onClose}>Отмена</Button>
              </FlexGrid.Cell>
            </FlexGrid.Row>
          </Section>
        </Modal.Content>
      </Tabs>
    )
  }
}


const ExtraFields = ({fields}) => {
  const TYPES = [
      {title: 'Форм-фактор', value: 'formFactor'},
      {title: 'Ниша', value: 'niche'},
    ],
    VALUES = {
      [TYPES[0].value]: [
        {title: 'капли', value: 'drops'},
        {title: 'гель', value: 'gel'},
        {title: 'таблетки', value: 'pills'},
      ],
      [TYPES[1].value]: [
        {title: 'БАД', value: 'DS'},
        {title: 'Красота', value: 'beauty'},
        {title: 'Здоровье', value: 'health'},
      ]
    }

  return (
    <Fragment>
      <FlexGrid.Column>
        {fields.map((group, index) => {
          const {type} = fields.get(index),
          availTypes = TYPES.filter(({value}) => !fields
            .getAll()
            .filter((_, setIndex) => setIndex < index)
            .map(({type}) => type)
            .includes(value)
          )
          return (
            <FlexGrid.Cell key={index}>
              <ActionBlock icon="trash" position={{top: 30}} color="#bbb" hoverColor="#fa6b6b" onAction={() => fields.remove(index)}>
                <FlexGrid.Row>
                  <FlexGrid.Cell grow="1">
                    <Field
                      grow
                      name={group + '.type'}
                      label="Тип поля"
                      component={Select}
                      validate={validation.type}
                      disabled={fields.length !== index + 1}
                      options={availTypes}
                    />
                  </FlexGrid.Cell>
                  <FlexGrid.Cell grow="1">
                    <Field
                      grow
                      name={group + '.value'}
                      label="Значение"
                      component={Select}
                      validate={validation.value}
                      disabled={!type}
                      options={VALUES[type] || []}
                    />
                  </FlexGrid.Cell>
                </FlexGrid.Row>
              </ActionBlock>
            </FlexGrid.Cell>
          )
        })}
      </FlexGrid.Column>
      <br/>
      {fields.length < TYPES.length &&
        <Button
          size="tiny"
          onClick={() => fields.push({})}
          disabled={fields.length && !fields.getAll()[fields.length - 1].type}
        >
          Добавить поле +
        </Button>
      }
    </Fragment>
  )
}

const Suppliers = ({fields, actions, data: {currencies = {}, countries = {}, suppliers = {}}}) =>
  <Fragment>
    <FlexGrid.Column borders>
      {fields.map((group, index) =>
        <FlexGrid.Cell key={index}>
          <ActionBlock
            icon="trash"
            position={{top: 30}}
            color="#bbb"
            hoverColor="#fa6b6b"
            onAction={() => fields.remove(index)}
          >
            <FlexGrid.Row>
              <FlexGrid.Cell>
                <FlexGrid.Column>
                  <FlexGrid.Cell>
                    <Field
                      grow
                      name={group + '.country_id'}
                      label="Страна"
                      component={Select}
                      disabled={!countries.data || countries.loading}
                      loading={countries.loading}
                      validate={validation.country}
                      options={countries.data && countries.data.map(({id, name}) => ({value: id, title: name}))}
                      onChange={actions.fetchSuppliers(index)}
                    />
                  </FlexGrid.Cell>
                  <FlexGrid.Cell>
                    <Field
                      grow
                      name={group + '.price'}
                      type="number"
                      label="Цена продукта без НДС (по договору)"
                      component={Input}
                      validate={validation.price}
                    />
                  </FlexGrid.Cell>
                </FlexGrid.Column>
              </FlexGrid.Cell>
              <FlexGrid.Cell>
                <FlexGrid.Column>
                  <FlexGrid.Cell>
                    <Field
                      grow
                      name={group + '.supplier_id'}
                      label="Поставщик"
                      component={Select}
                      disabled={!suppliers[index] || !suppliers[index].data || !suppliers[index].data.length}
                      loading={suppliers[index] && suppliers[index].loading}
                      validate={validation.supplier}
                      options={suppliers[index] && suppliers[index].data && suppliers[index].data.map(({id, name}) => ({value: id, title: name}))}
                    />
                  </FlexGrid.Cell>
                  <FlexGrid.Cell>
                    <Field
                      grow
                      name={group + '.price2'}
                      label="Стоимость с НДС"
                      type="number"
                      disabled
                      component={Input}
                      validate={validation.price2}
                    />
                  </FlexGrid.Cell>
                </FlexGrid.Column>
              </FlexGrid.Cell>
              <FlexGrid.Cell grow="0">
                <FlexGrid.Column>
                  <FlexGrid.Cell>
                    <Field
                      name={group + '.amount'}
                      label="Количество единиц за одну поставку"
                      type="number"
                      component={Input}
                      validate={validation.amount}
                    />
                  </FlexGrid.Cell>
                  <FlexGrid.Cell>
                    <Field
                      name={group + '.currency_id'}
                      label="Валюта"
                      component={Select}
                      loading={currencies.loading}
                      disabled={!currencies.data}
                      validate={validation.currencies}
                      options={currencies.data && currencies.data.map(({id, name}) => ({title: name, value: id}))}
                    />
                  </FlexGrid.Cell>
                </FlexGrid.Column>
              </FlexGrid.Cell>
            </FlexGrid.Row>
          </ActionBlock>
        </FlexGrid.Cell>
      )}
    </FlexGrid.Column>
    <br/>
    <Button
      size="tiny"
      onClick={() => fields.push({})}
    >
      Добавить поле +
    </Button>
    <br/>
    <br/>
    <br/>
    <br/>
  </Fragment>


export default Editor