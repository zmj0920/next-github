import { memo, useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import 'github-markdown-css'
const md = new MarkdownIt({
    html: true, //讲html标签转化
    linkify: true, //实现url跳转
})

//字符串转化
const b64ToUtf8 = (str) => {
    return decodeURIComponent(escape(atob(str)))
}
//memo 优化 props不发生变化不重新渲染组件
export default memo(({ content, isBase64 }) => {
    //判断是否是 base64进行转化
    const base64Converted = isBase64 ? b64ToUtf8(content) : content
    //优化 base64Converted 不发生变化不重新渲染
    const html = useMemo(() => md.render(base64Converted), [base64Converted])
    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    )
})
