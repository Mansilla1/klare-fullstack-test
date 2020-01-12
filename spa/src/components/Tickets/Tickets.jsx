import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Button,
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
    // statusList: [],
    // ticketList: [],
    statusList : [
      {
          "id": 1,
          "status": "pending",
          "display_name": "Pendiente"
      },
      {
          "id": 2,
          "status": "completed",
          "display_name": "Completado"
      }
    ],
    ticketList: [
      {
          "id": 4,
          "title": "testing",
          "description": null,
          "created_at": "2020-01-05T23:03:52.747972Z",
          "updated_at": "2020-01-05T23:03:52.748015Z",
          "status": 1
      },
      {
          "id": 5,
          "title": "testing2",
          "description": null,
          "created_at": "2020-01-05T23:06:06.766798Z",
          "updated_at": "2020-01-05T23:06:06.766842Z",
          "status": 1
      },
      {
          "id": 6,
          "title": "testing3",
          "description": "sfkajsdfkajskfasd",
          "created_at": "2020-01-05T23:06:27.277582Z",
          "updated_at": "2020-01-06T00:56:18.724850Z",
          "status": 2
      }
    ],
  }

  state = {
    displayModal: false,
    edit: false,
    record: null,
  }

  componentWillMount() {
    this.props.getStatusList()
    this.props.getTicketList()
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
      dataIndex: 'statusInfo',
      render: (text, record ) => record.statusInfo.display_name || '-',
    },
    {
      title: 'Acciones',
      rowKey: 'actions',
      render: (text, record) => this.renderActions(record),
    },
  ]

  getMatchedResult = (ticketList, statusList) => ticketList.map(ticket => ({
    ...ticket,
    statusInfo: statusList.find(stats => stats.id === ticket.status) || {},
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
    } = this.state

    const matchedResult = this.getMatchedResult(ticketList, statusList)

    return (
      <div>
        <Row>
          <Button
            icon="plus-circle"
            type="primary"
            onClick={this.openModal({ edit: false, record: null })}
          >
            Nueva tarea
          </Button>
        </Row>
        <Row>
          <Table
            columns={this.columns}
            dataSource={matchedResult}
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
  // statusList: state.status.statusList,
  // ticketList: state.tickets.ticketsList,
})

const mapDispatchToProps = {
  getStatusList,
  getTicketList,
  removeData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
