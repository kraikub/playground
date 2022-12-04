import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const Code = ({ children, language }: any) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={materialOceanic}
      codeTagProps={{ style: { fontFamily: "'Roboto Mono', monospace" } }}
      customStyle={{
        borderRadius: "10px",
        backgroundColor: "#2c3036",
      }}
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  );
};
