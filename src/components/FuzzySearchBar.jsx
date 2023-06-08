import { useState } from "react";
import { Select, Input, Space } from "antd";
import fuzzysearch from "fuzzysearch";

const { Option } = Select;

export default function FuzzySearchBar({ data, onSearchResult }) {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("title");

  const handleSearch = (text) => {
    setSearchText(text);
  
    const results = data.filter((item) => {
      if (searchField === "tags") {
        return item[searchField].some(tag =>
          fuzzysearch(text.toLowerCase(), tag.toLowerCase())
        );
      } else {
        return fuzzysearch(text.toLowerCase(), item[searchField].toLowerCase());
      }
    });
  
    onSearchResult(results);
  };

  const handleFilterChange = (value) => {
    setSearchField(value);
  };

  return (
    <Space className="search-bar">
      <Select
        defaultValue="title"
        style={{ width: 96 }}
        onChange={handleFilterChange}
      >
        <Option value="title">Title</Option>
        <Option value="author">Author</Option>
        <Option value="tags">Tag</Option>
      </Select>
      <Input.Search
        placeholder="Search short stories and poems"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 400 }}
      />
    </Space>
  );
}
