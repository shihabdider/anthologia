import './App.css'
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FuzzySearchBar from "./components/FuzzySearchBar";
import ReactMarkdown from "react-markdown";
import { Card, Typography, List, Tag } from "antd";
import stories from "./data/stories";

const { Title, Text, Paragraph } = Typography;

const baseRenderers = {
  heading: (props) => <Title level={props.level}>{props.children}</Title>,
  list: (props) => <List bordered>{props.children}</List>,
  listItem: (props) => <List.Item>{props.children}</List.Item>,
  inlineCode: (props) => <Text code>{props.children}</Text>,
  code: (props) => <Paragraph>{props.children}</Paragraph>,
  blockquote: (props) => <Text type="secondary">{props.children}</Text>,
};

function StoryPage({ content, tags }) {
  const isPoem = tags?.includes("poem");

  const renderers = {
    ...baseRenderers,
    p: isPoem ? (props) => <pre>{props.children}</pre> : (props) => <Paragraph>{props.children}</Paragraph>,
  };

  return (
    <div className="story-page">
      <Link to="/" className="homepage-link">
        Back to homepage
      </Link>
      <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
    </div>
  );
}

function HomePage() {
  const [searchResults, setSearchResults] = useState(stories);

  const handleSearchResult = (results) => {
    setSearchResults(results);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="homepage">
      <div className="header">
        <Title className='site-title'>Anthologia</Title>
        <FuzzySearchBar data={stories} onSearchResult={handleSearchResult} />
      </div>
      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result.title} className="search-result">
          <Card
            title={result.title}
            extra={<Link to={`/${result.path}`}>Read</Link>}
            style={{ marginBottom: "1rem" }}
          >
            <p>
              <strong>Author: </strong>{result.author}
            </p>
              <p>{truncateText(result.content.replace(/(?:^[#]+.*(?:\r\n|\r|\n)?|(?:\r\n|\r|\n))/gm, " "), 300)}</p>
            <div>
              {result.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </div>
          </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {stories.map((story) => (
          <Route
            key={story.path}
            path={`/${story.path}`}
            element={<StoryPage content={story.content} tags={story.tags} />} // Pass the tags prop here
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
