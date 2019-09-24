import { memo, isValidElement } from 'react'
import { withRouter } from 'next/router'
import { Row, Col, List, Pagination } from 'antd'
import Link from 'next/link'
import Repo from '../components/Repo'
import { genCacheKeyByQuery } from '../lib/util'
import clientCache from '../lib/client-cache'
import { request } from '../lib/api'
/**
  * 关心的search条件
  * sort: 排序方式
  * order: 排序升降顺序
  * lang: 仓库开发主语言
  * page: 分页
  */

const { cache, useCache } = clientCache({
    genCacheKeyStrate: (context) => {
        return genCacheKeyByQuery(context.ctx.query)
    }
})

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Vue', 'React']
const SORT_TYPES = [
    {
        name: 'Best Match',
    },
    {
        name: 'Most Starts',
        sort: 'stars',
        order: 'desc',
    },
    {
        name: 'Fewest Starts',
        sort: 'stars',
        order: 'asc',
    },
    {
        name: 'Most Forks',
        sort: 'forks',
        order: 'desc',
    },
    {
        name: 'Fewest Forks',
        sort: 'forks',
        order: 'asc',
    },
]

const PER_PAGE = 20
const Search = ({ router, searchRepos }) => {
    console.log(searchRepos)
    
    const { query } = router

    const {
        sort, order, lang, page = 1
    } = query

    useCache(genCacheKeyByQuery(query), { searchRepos })

    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={
                            <span className="list-header">
                                语言
                            </span>
                        }
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGES}
                        renderItem={item => {
                            return (
                                <List.Item>
                                    <Link href="/search">
                                        <a>{item}</a>
                                    </Link>
                                </List.Item>
                            )
                        }
                        }
                    />
                    <List
                        bordered
                        header={
                        <span className="list-header">
                                排序
                        </span>
                        }
                        style={{ marginBottom: 20 }}
                        dataSource={SORT_TYPES}
                        renderItem={item => {
                            return (
                                <List.Item>
                                    <Link href="/search">
                                        <a>{item.name}</a>
                                    </Link>
                                </List.Item>
                            )
                        }
                        }
                    />
                </Col>
            </Row>
        </div>
    )
}

Search.getInitialProps = cache(async ({ ctx }) => {
    const {
        query, sort, lang, order = 'desc', page,
    } = ctx.query


    if (!query) {
        return {
            repos: {
                total_count: 0,
            },
        }
    }

    // ?q=react+language:javascript&sort=start&order=desc&page=2
    //搜索
    let queryString = `?q=${query}`

    //仓库开发主语言
    if (lang) {
        queryString += `+language:${lang}`
    }
    //排序方式
    if (sort) {
        queryString += `&sort=${sort}&order=${order}`
    }
    //分页
    if (page) {
        queryString += `&page=${page}`
    }

    queryString += `&per_page=${PER_PAGE}`

    const { data: searchRepos } = await request({
        url: `/search/repositories${queryString}`,
    }, ctx.req, ctx.res)

    return {
        searchRepos
    }
})

export default withRouter(Search)