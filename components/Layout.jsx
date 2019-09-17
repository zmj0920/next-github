import { useState, useCallback, useMemo } from 'react'
import { Layout, Icon, Input, Avatar } from 'antd';
const { Header, Content, Footer } = Layout;
import Container from './Container'
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

export default ({ children }) => {
    const [search, setSeach] = useState('')
    //搜索事件
    const handleSearchChange = useCallback((event) => {
        setSeach(event.target.value)
    }, [setSeach])

    //搜索按钮触发事件
    const handleOnSeach = useCallback(() => {

    }, [])

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
                            <Avatar size={40} icon="user" />
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
