import { useState, useCallback, useMemo } from 'react'
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';

import Container from './Container'
import { connect } from 'react-redux'
import getCofnig from 'next/config'
import { format } from 'url';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
const { publicRuntimeConfig } = getCofnig()
const { Header, Content, Footer } = Layout;
//图标样式
const githubIconStyle = {
    color: 'white',
    fontSize: 40,
    display: 'block',
    paddingTop: 10,
    marginRight: 20
}
//底部样式
const footerStyle = {
    textAlign: 'center'
}

function AppLayout({ children, user }) {
    const [search, setSeach] = useState('')
    //搜索事件
    const handleSearchChange = useCallback((event) => {
        setSeach(event.target.value)
    }, [setSeach])

    //搜索按钮触发事件
    const handleOnSeach = useCallback(() => {

    }, [])
    const userDorpDown = (
        <Menu>
            <Menu.Item>
                <a href="javascript:viod(0)">
                   登出
                </a>
            </Menu.Item>
        </Menu>)
    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
                    <div className="header-left">
                        <div className="logo">
                            <Icon type="github" style={githubIconStyle} />
                        </div>
                        <div>
                            <Input.Search
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="搜索仓库"
                                onSearch={handleOnSeach}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            {
                                user && user.id ? (
                                    <Dropdown overlay={userDorpDown}>
                                        <a href="/">
                                            <Avatar size={40} src={user.avatar_url} />
                                        </a>
                                    </Dropdown>
                                ) : (
                                        <Tooltip title="点击登录">
                                            <a href={publicRuntimeConfig.OAUTH_URL}>
                                                <Avatar size={40} icon="user" />
                                            </a>
                                        </Tooltip>
                                    )
                            }

                        </div>
                    </div>

                </Container>
            </Header>
            <Content>
                <Container>
                    index {children}
                </Container>
            </Content>
            <Footer style={footerStyle}>
                Develop by   渣渣新 @
                <a href="http://www.521em.cn">我是渣渣新</a>
            </Footer>
            <style jsx>{`
            .header-inner{
                display: flex;
                justify-content:space-between;
             }
            .header-left{
                display:flex;
                justify-content:flex-start;
            }
            `}</style>
            <style jsx global>{`
              #__next{
                  height:100%;
              }
              .ant-layout{
                height:100%;
              }
              .ant-layout-header{
                padding-left:0;
                padding-right:0;
              }
            `}</style>
        </Layout>
    )
}

//connect映射state

export default connect(function mapState(state) {
    return {
        user: state.user
    }
})(AppLayout)