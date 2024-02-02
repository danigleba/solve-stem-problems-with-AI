import ReactMarkdown from "react-markdown"
import rehypeMath from "rehype-math"
import katex from "rehype-katex"
import "katex/dist/katex.min.css"

export default function MarkdownRenderer({ source }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeMath, katex]} children={source} />
  )
}

