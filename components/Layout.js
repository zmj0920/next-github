import {
    Layout, Icon, Input, Avatar, Button, Tooltip, Dropdown, Menu,
} from 'antd'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from './Container'
//   import { logout } from '../store/store'
import { logout } from '../store/reducer'
const { Header, Content, Footer } = Layout

const AppLayout = ({ children, router }) => {
    const { query: { query = '' } = {} } = router
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()

    const [search, setSearch] = useState(query)
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleOnSearch = () => {
        router.push(`/search?query=${search}`)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

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
                <Container>
                    <div className="header-inner">
                        <div className="header-left">
                            <div className="logo">
                                <Link href="/">
                                    <a>
                                        <Icon type="github" className="icon-github" />
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Input.Search
                                    onChange={handleSearchChange}
                                    onSearch={handleOnSearch}
                                    value={search}
                                    placeholder="搜索仓库"
                                />
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="user">
                                {user.id ? (
                                    <Dropdown overlay={UserDropDown}>
                                        <a href={user.html_url} target="blank">
                                            <Avatar size={40} src={user.avatar_url} />
                                        </a>
                                    </Dropdown>
                                ) : (
                                        <Tooltip placement="bottom" title="点击进行登录">
                                            <a href={`/prepare-auth?url=${router.asPath}`}>
                                                <Avatar size={40} icon="user" />
                                            </a>
                                        </Tooltip>
                                    )}
                            </div>
                        </div>
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>
                    {children}
                </Container>
            </Content>
            <Footer className="footer">
                <a href="https://github.com/zmj0920">github</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="http://www.521em.cn">前端手册</a>
            </Footer>
            <style jsx global>
                {`
            #__next {
              height: 100%;
            }
  
            .ant-layout {
              min-height: 100%;            
            }
  
            .ant-layout-header {
              padding-left: 0;
              padding-right: 0;
            }
  
            .ant-layout-content {
              background: #fff;
            }
          `}
            </style>
            <style jsx>
                {`
            .header-inner {
              display: flex;
              justify-content: space-between;
            }
  
            .header-left {
              display: flex;
              justify-content: flex-start;
            }
  
            :global(.icon-github) {
              display: block;
              padding-top: 10px;
              margin-right: 20px;
              color: #fff;
              font-size: 40px;
            }
  
            :global(.footer) {
              text-align: center;
            }
        `}
            </style>
        </Layout>
    )
}

export default withRouter(AppLayout)
