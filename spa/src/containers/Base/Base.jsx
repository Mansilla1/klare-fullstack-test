import React from 'react'
import 'antd/dist/antd.css'
import {
  Breadcrumb,
  Layout,
  Menu,
} from 'antd'

import Tickets from '/spa/src/components/Tickets/Tickets'

const { Header, Content, Footer } = Layout


export default class Base extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">TODO</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Tickets
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>KLARE FULLSTACK TEST ©2020</Footer>
      </Layout>
    )
  }
}
