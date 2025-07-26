import ReactMarkdown from "react-markdown";
import rehypeKatext from "rehype-katex";
import remarkMath from "remark-math";

type ChatMessageProps = {
  content: string;
};

function ChatMessage({ content }: ChatMessageProps) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatext]}
    />
  );
}

export default ChatMessage;
