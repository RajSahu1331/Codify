import React from 'react';
import { Editor } from '@monaco-editor/react';

const MonacoEditorWrapper = ({ language, value, onChange, setCode }) => {
  return (
    <Editor
      height="300px"
      defaultLanguage={language}
      value={value}
      onChange={onChange}
      onMount={(editor) => {
        // Update the 'code' state with the editor's content
        editor.onDidChangeModelContent(() => {
          const newCode = editor.getValue();
          setCode(newCode);
        });
      }}
    />
  );
};

export default MonacoEditorWrapper;
