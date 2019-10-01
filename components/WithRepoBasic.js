import Link from 'next/link'
import { withRouter } from 'next/router'
import Repo from './Repo'
import { request } from '../lib/api'
import initCache from '../lib/client-cache'
import { genDetailCacheKeyStrate, genDetailCacheKey } from '../lib/util'

//截取 将 query 转化成url参数
function makeQuery(queryObject) {
    const query = Object.entries(queryObject)
        .reduce((result, entry) => {
            result.push(entry.join('='))
            return result
        }, [])
        .join('&')
    return `?${query}`
}

const { cache, useCache } = initCache({
    genCacheKeyStrate: genDetailCacheKeyStrate,
})
export default (Comp, type = 'index') => {
           //把剩余的props 传递下去 rest
    const WithDetail = ({ repoBasic, router, ...rest }) => {
        useCache(genDetailCacheKey(router), { repoBasic, ...rest })
        const query = makeQuery(router.query)
        return (
            <div className="root">
                <div className="repo-basic">
                    <Repo repo={repoBasic} />
                    <div className="tabs">
                        <Link href={`/detail${query}`}>
                            {type === 'index' ? (
                                <span className="tab">Readme</span>
                            ) : (
                                    <a title="readme" className="tab index">Readme</a>
                                )}
                        </Link>
                        <Link href={`/detail/issues${query}`}>
                            {type === 'issues' ? (
                                <span className="tab">Issues</span>
                            ) : (
                                    <a title="issues" className="tab issues"></a>
                                )}
                        </Link>
                    </div>
                </div>
                <div>
                 {/*hoc常用操作 不用的 props都要传递下去给目标组件 把剩余的props 传递下去 rest */}
                    <Comp {...rest} />
                </div>
                <style jsx>{`
            .root {
              padding-top: 20px;
            }
  
            .repo-basic {
              padding: 20px;
              border: 1px solid #eee;
              margin-bottom: 20px;
              border-radius: 5px;
            }
  
            .tab + .tab {
              margin-left: 20px;
            }
          `}
                </style>
            </div>
        )
    }

    WithDetail.getInitialProps = cache(async (context) => {
        const { ctx } = context
        const { owner, name } = ctx.query
        const { data: repoBasic } = await request({
            url: `/repos/${owner}/${name}`,
        }, ctx.req, ctx.res)
        //吧传过来的getInitialProps进行赋值
        let pageData = {}
        if (Comp.getInitialProps) {
            pageData = await Comp.getInitialProps(context)
        }
        return {
            repoBasic,
            ...pageData,
        }
    })

    return withRouter(WithDetail)
}
