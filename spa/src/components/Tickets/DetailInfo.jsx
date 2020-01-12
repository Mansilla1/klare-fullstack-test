import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tag,
  Tooltip,
} from 'antd'

import { saveData } from '/spa/src/redux/actions/tickets/tickets'


const { Option } = Select
const { Item } = Form
const { TextArea } = Input


class DetailInfoData extends React.Component {
  static props = {
    record: PropTypes.object,
    visible: PropTypes.bool,
    edit: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    statusList: PropTypes.arrayOf(PropTypes.shape()),
    form: PropTypes.shape(),
    saveData: PropTypes.func.isRequired,
  }

  static defaultProps = {
    record: null,
    visible: false,
    edit: false,
    statusList: [],
    form: null,
  }

  state = {
    isLoading: false,
  }

  handleSubmit = () => {
    const {
      edit,
      form,
      record,
    } = this.props
    this.setState({
      isLoading: true,
    })
    this.props.saveData({
      id: edit ? record.id : null,
      title: form.getFieldValue('title'),
      status: form.getFieldValue('status'),
      description: form.getFieldValue('description'),
    })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  drawModalContent = (typeOfAction, record) => {
    if (typeOfAction === 'detail') {
      return this.drawDetail(record)
    }
    return this.drawFormData(record, typeOfAction === 'edit')
  }

  drawDetail = record => (
    <div>
      <Row>
        <Col span={12}>
          <Tag color="magenta">
            {record.statusInfo.display_name}
          </Tag>
        </Col>
        <Col span={12}>
          <Tooltip
            placement="top"
            title="Fecha de creación"
          >
            {record.created_at.split('T')[0]} {record.created_at.split('T')[1].split('.')[0]}
          </Tooltip>
        </Col>
      </Row>
      {record.description
        ? (
          <Row>
            <h5>Descripción:</h5>
            <p>
              {record.description}
            </p>
          </Row>
        )
        : 'Sin descripción'
      }
    </div>
  )

  drawFormData = (record, edit = false) => {
    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
        <Item label="Título">
          {getFieldDecorator('title',
            {
              initialValue: edit ? record.title : '',
            })(
              <Input placeholder="Título" />
            )
          }
        </Item>
        <Item label="Estado">
          {getFieldDecorator('state',
            {
              initialValue: edit ? record.status : 1
            })(
              <Select placeholder="Estado" >
                {this.props.statusList.map(status => (
                  <Option value={status.id}>{status.display_name}</Option>
                ))}
              </Select>
            )
          }
        </Item>
        <Item label="Descripción">
          {getFieldDecorator('description',
          {})(
            <TextArea
              rows={4}
            />
          )
          }
        </Item>
      </Form>
    )
  }

  render() {
    const {
      record,
      visible,
      edit,
      onClose,
    } = this.props

    let title = 'Nuevo ticket'
    let typeOfAction = 'new'
    if (edit && record) {
      title = `Editar registro ${record.id}`
      typeOfAction = 'edit'
    } else if (!edit && record) {
      title = `Detalles ${record.title} (ID: ${record.id})`
      typeOfAction = 'detail'
    }

    return (
      <Modal
        visible={visible}
        onCancel={onClose}
        title={title}
        onOk={typeOfAction === 'detail' ? onClose : this.handleSubmit}
        confirmLoading={this.state.isLoading}
        destroyOnClose
      >
        {visible &&
          this.drawModalContent(typeOfAction, record)
        }
      </Modal>
    )
  }
}

const DetailInfo = Form.create()(DetailInfoData)

const mapDispatchToProps = {
  saveData,
}

export default connect(null, mapDispatchToProps)(DetailInfo)
