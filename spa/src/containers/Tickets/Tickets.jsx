import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Table,
} from 'antd'


import { getTicketList } from '/spa/src/redux/actions/tickets/tickets'


class Tickets extends React.Component {

  static props = {
    getTicketList: PropTypes.func.isRequired,
    ticketList: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    ticketList: [],
  }

  componentWillMount() {
    this.props.getTicketList()
  }

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.ticketList}
      />
    )
  }
}


const mapStateToProps = state => ({
  ticketList: state.tickets.ticketsList,
})

const mapDispatchToProps = dispatch => ({
  getTicketList,
})

export default connect(mapStateToProps, mapDispatchToProps)(Tickets)
