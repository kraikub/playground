import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Code = ({ children, language }: any) => {
  return (
    <SyntaxHighlighter
      language={language}
      codeTagProps={{ style: { fontFamily: "'Roboto Mono', monospace" } }}
      customStyle={{
        borderRadius: "10px",
        fontSize: "12px",
      }}
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  );
};
