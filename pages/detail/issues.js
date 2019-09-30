import { useRouter } from 'next/router'
//import 'github-markdown-css'
import WithRepoBasic from '../../components/WithRepoBasic'
//import { request } from '../../lib/api'
//import initCache from '../../lib/client-cache'
//import { genDetailCacheKeyStrate, genDetailCacheKey } from '../../lib/util'
//import MarkdownRenderer from '../../components/MarkdownRenderer'

// const { cache, useCache } = initCache({
//   genCacheKeyStrate: (context) => {
//     return genDetailCacheKeyStrate(context)
//   },
// })
const Issues = ({ readme }) => {
//   const router = useRouter()
//   useCache(genDetailCacheKey(router), {
//     readme,
//   })

  return (
      <div>Issues</div>
    // <MarkdownRenderer
    //   isBase64
    //   content={readme.content}
    // />
  )
}

// Issues.getInitialProps = cache(async ({
//   ctx: {
//     query: {
//       owner,
//       name,
//     },
//     req,
//     res,
//   },
// }) => {
//   const { data } = await request({
//     url: `/repos/${owner}/${name}/readme`,
//   }, req, res)
//   return {
//     readme: data,
//   }
// })

export default WithRepoBasic(Issues, "issues")
