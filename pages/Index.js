import Head from 'next/head'
import { Button, Icon, Tabs } from 'antd'
import { request } from '../lib/api'
import Router, { withRouter } from 'next/router'
import { useSelector } from 'react-redux'
import getConfig from 'next/config'
import Repo from '../components/Repo'
import clientCache from '../lib/client-cache'

const { cache, useCache } = clientCache()

const { publicRuntimeConfig } = getConfig()

const Index = ({ userRepos, userStarredRepos, router }) => {
    const user = useSelector(store => store.user)
    //tabs切换

    const tabKey = router.query.key || '1'

    const handleTabChange = (activeKey) => {
        Router.push(`/?key=${activeKey}`)
    }
    useCache('cache', {
        userRepos,
        userStarredRepos,
    })

    if (!user || !user.id) {
        return (
            <>
                <Head>
                    <title>首页</title>
                </Head>
                <div className="root">
                    <p>亲，您还没有登录哦</p>
                    <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
                        点击登录
                </Button>
                    <style jsx>{`
                    .root {
                    height: 400px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    }
                `}</style>
                </div>
            </>
        )
    }



    return (
        <>
            <Head>
                <title>首页</title>
            </Head>
            <div className="root">
                <div className="user-info">
                    <img src={user.avatar_url} alt="user avatar" className="avatar" />
                    <span className="name">{user.name}</span>
                    <span className="login">{user.login}</span>
                    <span className="bio"></span>
                    <p className="email">
                        <Icon type="email" style={{ marginRight: 10 }}></Icon>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </p>
                </div>
                <div className="user-repos">
                    <Tabs activeKey={tabKey} animated={false} onChange={handleTabChange}>
                        <Tabs.TabPane tab="你的仓库" key="1">
                            {userRepos.map(repo => <Repo key={repo.id} repo={repo} />)}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="你关注的仓库" key="2">
                            {userStarredRepos.map(repo => <Repo key={repo.id} repo={repo} />)}
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <style jsx>{`
                .root{
                    display: flex;
                    align-items:flex-start;
                    padding: 20px 0;
                }
                .user-info{
                    width:200px;
                    margin-right:40px;
                    /* 禁止被压缩*/
                    flex-shrink:0;
                    display: flex;
                    /*竖着排列 */
                    flex-direction: column;
                }
                .login{
                    font-size:20px;
                    color: #666;
                }
                .name{
                    margin-top:20px;
                    font-weight: 800;
                    font-size: 26px;
                    color: #24292e;
                   
                }
                .bio{
                    margin-top:20px;
                    color:#333;
                }
                .avatar{
                    width:100%;
                    border-radius:5px;
                }
                .user-repos {
                    flex: 1;
                }
        
                :global(.icon-email) {
                    margin-right: 10px;
                }
                `}</style>
            </div>
        </>
    )
}

Index.getInitialProps = cache(async ({ ctx, reduxStore }) => {
    //判断用户是否登出
    const { user } = reduxStore.getState()
    if (!user || !user.id) {
        return {}
    }

    //个人仓库
    const { data: userRepos } = await request(
        {
            url: '/user/repos',
        },
        ctx.req,
        ctx.res,
    )
    //关注的仓库
    const { data: userStarredRepos } = await request(
        {
            url: '/user/starred',
        },
        ctx.req,
        ctx.res,
    )
    return {
        userRepos,
        userStarredRepos,
    }
})
export default withRouter(Index)

