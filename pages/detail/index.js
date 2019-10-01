import { useRouter } from 'next/router'
import WithRepoBasic from '../../components/WithRepoBasic'
import { request } from '../../lib/api'
import initCache from '../../lib/client-cache'
import { genDetailCacheKeyStrate, genDetailCacheKey } from '../../lib/util'
import  dynamic  from 'next/dynamic'
const MarkdownRenderer = dynamic(() => import('../../components/MarkdownRenderer'),{
  loading:()=><p>Loading</p>
}) 

const { cache, useCache } = initCache({
  genCacheKeyStrate: (context) => {
    return genDetailCacheKeyStrate(context)
  },
})
const Detail = ({ readme }) => {

  const router = useRouter()

  //根据路由缓存
  useCache(genDetailCacheKey(router), {
    readme
  })

  return (
    <MarkdownRenderer
      isBase64
      content={readme.content}
    />
  )
}

Detail.getInitialProps = cache(async ({ ctx }) => {
  const { owner, name } = ctx.query;
  const { data: readme } = await request({
    url: `/repos/${owner}/${name}/readme`,
  }, ctx.req, ctx.res)
  return {
    readme
  }
})

export default WithRepoBasic(Detail)
