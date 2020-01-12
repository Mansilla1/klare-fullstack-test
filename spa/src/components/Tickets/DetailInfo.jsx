import React from 'react'
import PropTypes from 'prop-types'
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


const { Option } = Select
const { Item } = Form
const { TextArea } = Input


class DetailInfo extends React.Component {
  static props = {
    record: PropTypes.object,
    visible: PropTypes.bool,
    edit: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    statusList: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    record: null,
    visible: false,
    edit: false,
    statusList: [],
  }

  handleSubmit = () => {
    debugger
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

  drawFormData = (record, edit = false) => (
    <Form onSubmit={this.handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
      <Item label="Título">
        <Input
          placeholder="Título"
          value={edit ? record.title : ''}
        />
      </Item>
      <Item label="Estado">
        <Select
          placeholder="Estado"
          defaultValue={edit ? record.status : 1 }
        >
          {this.props.statusList.map(status => (
            <Option value={status.id}>{status.display_name}</Option>
          ))}
        </Select>
      </Item>
      <Item label="Descripción">
        <TextArea
          rows={4}
        />
      </Item>
    </Form>
  )

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
        onOk={typeOfAction === 'detail' ? onClose : this.submitButton}
        destroyOnClose
      >
        {visible &&
          this.drawModalContent(typeOfAction, record)
        }
      </Modal>
    )
  }

}

export default DetailInfo
