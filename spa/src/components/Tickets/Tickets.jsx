import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
  Col,
  Input,
  Modal,
  Popover,
  Row,
  Table,
} from 'antd'


import {
  getTicketList,
  removeData,
} from '/spa/src/redux/actions/tickets/tickets'
import { getStatusList } from '/spa/src/redux/actions/status/status'

import DetailInfo from './DetailInfo'


const ButtonGroup = Button.Group
const { confirm } = Modal
const { Search } = Input


class Tickets extends React.Component {

  static props = {
    getStatusList: PropTypes.func.isRequired,
    getTicketList: PropTypes.func.isRequired,
    removeData: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    statusList: PropTypes.arrayOf(PropTypes.shape()),
    ticketList: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    isLoading: false,
    statusList: [],
    ticketList: [],
  }

  state = {
    displayModal: false,
    edit: false,
    record: null,
    searchInput: '',
  }

  componentWillMount() {
    this.props.getStatusList()
    this.props.getTicketList()
  }

  handleSearchInputChange = value => this.setState({ searchInput: value.target.value })

  getFilteredResult = (dataResult, searchValues) => {
    const search = searchValues.toLowerCase()
    const filteredResult = dataResult.filter(summary => (
      Object.values(summary).some(value => (
        `${value}`.toLowerCase().includes(search)
      ))
    ))

    return filteredResult
  }

  columns = [
    {
      title: 'ID',
      rowKey: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Título',
      rowKey: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Estado',
      rowKey: 'status',
      dataIndex: 'statusDisplay',
      filters: [
        { text: 'Pendiente', value: 'Pendiente' },
        { text: 'Completado', value: 'Completado' },
      ],
      onFilter: (value, record) => `${record.statusDisplay}` === value,
    },
    {
      title: 'Acciones',
      rowKey: 'actions',
      render: (text, record) => this.renderActions(record),
    },
  ]

  getMatchedResult = (ticketList, statusList) => ticketList.map(ticket => ({
    ...ticket,
    statusDisplay: (statusList.find(stats => stats.id === ticket.status) || {}).display_name,
  }))

  openModal = (values) => () => {
    this.setState({
      ...values,
      displayModal: true,
    })
  }

  closeModal = () => {
    this.setState({ displayModal: false, record: null })
  }

  handleDelete = record => () => {
    confirm({
      title: '¿Está seguro que desea eliminar el registro?',
      onOk: () => {
        this.props.removeData(record.id)
      },
      onCancel() { },
      cancelText: 'Cancelar',
      okType: 'danger',
    })
  }

  renderActions = record => (
    <ButtonGroup>
      <Popover content="Detalles">
        <Button
          type="default"
          icon="plus"
          onClick={this.openModal({ edit: false, record })}
        />
      </Popover>
      <Popover content="Editar">
        <Button
          type="primary"
          icon="edit"
          onClick={this.openModal({ edit: true, record })}
        />
      </Popover>
      <Popover content="Eliminar">
        <Button
          type="danger"
          icon="delete"
          onClick={this.handleDelete(record)}
        />
      </Popover>
    </ButtonGroup>
  )

  render() {
    const {
      isLoading,
      ticketList,
      statusList,
    } = this.props

    const {
      displayModal,
      edit,
      record,
      searchInput,
    } = this.state

    const matchedResult = this.getMatchedResult(ticketList, statusList)
    const filteredResult = this.getFilteredResult(matchedResult, searchInput)

    return (
      <div>
        <Row>
          <Col span={8}>
            <Button
              icon="plus-circle"
              type="primary"
              onClick={this.openModal({ edit: false, record: null })}
            >
              Nueva tarea
            </Button>
          </Col>
          <Col span={6} offset={10}>
            <Search
              placeholder="Buscar..."
              onChange={this.handleSearchInputChange}
              enterButton
              allowClear
            />
          </Col>
        </Row>
        <Row>
          <Table
            columns={this.columns}
            dataSource={filteredResult}
            loading={isLoading}
            rowKey="id"
          />
        </Row>
        <DetailInfo
          record={record}
          visible={displayModal}
          edit={edit}
          onClose={this.closeModal}
          statusList={statusList}
        />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  isLoading: state.api.tickets.tickets.loading,
  statusList: state.status.statusList,
  ticketList: state.tickets.ticketsList,
})

const mapDispatchToProps = {
  getStatusList,
  getTicketList,
  removeData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
