// src/routes/Post.jsx
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';
import './Post.css';

function Post() {
  const [postData, setPostData] = useState({
    title: '',
    code: '',
    markdown: '',
    language: 'javascript'
  });

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'xml', label: 'HTML/XML' },
    { value: 'markdown', label: 'Markdown' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission
    console.log('Post submitted:', postData);
  };

  return (
    <div className="post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="post-card">
          <h2>Create a Post</h2>
          
          {/* Title Input */}
          <div className="form-group">
            <label>Post Title</label>
            <input
              type="text"
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              placeholder="Enter post title..."
              className="title-input"
            />
          </div>

          {/* Code Editor Section */}
          <div className="form-group">
            <div className="code-header">
              <label>Code Editor</label>
              <select
                value={postData.language}
                onChange={(e) => setPostData({ ...postData, language: e.target.value })}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="code-editor">
              <CodeMirror
                value={postData.code}
                options={{
                  mode: postData.language,
                  theme: 'material',
                  lineNumbers: true,
                  lineWrapping: true
                }}
                onBeforeChange={(editor, data, value) => {
                  setPostData({ ...postData, code: value });
                }}
              />
            </div>
          </div>

          {/* Markdown Section */}
          <div className="form-group">
            <label>Description (Markdown)</label>
            <div className="markdown-container">
              <div className="markdown-editor">
                <textarea
                  value={postData.markdown}
                  onChange={(e) => setPostData({ ...postData, markdown: e.target.value })}
                  placeholder="Write your post content in markdown..."
                />
              </div>
              <div className="markdown-preview">
                <h4>Preview</h4>
                <div className="preview-content">
                  <ReactMarkdown>{postData.markdown}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;