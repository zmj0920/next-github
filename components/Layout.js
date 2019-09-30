import { useState, useCallback } from 'react'
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu, Button } from 'antd';
import Container from './Container'
import { connect, useSelector, useDispatch } from 'react-redux'
import getCofnig from 'next/config'
import { logout } from '../store/reducer'
import { withRouter } from 'next/router'
import Link from 'next/link'
// const { publicRuntimeConfig } = getCofnig()
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

function AppLayout({ children, user, router }) {
    //  const {query} = router.query.router
    //  const {query:{query}}=router
    const { query: { query = '' } = {} } = router
    const [search, setSeach] = useState(query)
    //useSelector()，而不用担心重复渲染的情况
    // const user = useSelector((store) => store.user)
    const dispatch = useDispatch()

    //搜索事件
    const handleSearchChange = useCallback((event) => {
        setSeach(event.target.value)
    }, [setSeach])

    //搜索按钮触发事件
    const handleOnSearch = useCallback(() => {
        router.push(`/search?query=${search}`)
    }, [search])
    //登出
    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    const UserDropDown = (
        <Menu>
            <Menu.Item>
                <Button onClick={handleLogout} type="link">登出</Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner" />}>
                    <div className="header-left">
                        <div className="logo">
                            <Link href="/">
                                <a>  <Icon type="github" style={githubIconStyle} /></a>
                            </Link>
                        </div>
                        <div>
                            <Input.Search
                                value={search}
                                onChange={handleSearchChange}
                                placeholder="搜索仓库"
                                onSearch={handleOnSearch}
                            />
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            {
                                user && user.id ? (
                                    <Dropdown overlay={UserDropDown}>
                                        <a href="/">
                                            <Avatar size={40} src={user.avatar_url} />
                                        </a>
                                    </Dropdown>
                                ) : (
                                        <Tooltip title="点击登录">
                                            <a href={`/prepare-auth?url=${router.asPath}`}>
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
                    {children}
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
                min-height:100%;
              }
              .ant-layout-header{
                padding-left:0;
                padding-right:0;
              }
              .ant-layout-content {
                background: #fff;
              }
            `}</style>
        </Layout>
    )
}

// export default  AppLayout
//connect映射state

export default connect(function mapState(state) {
    return {
        user: state.user
    }
})(withRouter(AppLayout))