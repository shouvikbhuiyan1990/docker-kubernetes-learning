import React, { useState } from 'react';
import Form from './components/form';
import Error from './components/error';
import DisplayColor from './components/displayColor';
import RecentlyViewed from './components/recentlyViewed';
import axios from 'axios';

import './App.css';

function App() {
  const [error, setError] = useState(false);
  const [recentViews, setRecentViews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const recentSearch = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/recentSearches');
      setRecentViews(data.result);
    }
    catch (e) {
      setError(true);
    }
  }
  const searchColors = async (text) => {
    let result = [];
    const { data } = await axios.post('http://localhost:5000/api/closest/colors', {
      "color": text.substring(1, text.length)
    });
    JSON.parse(data.result).forEach((item) => {
      result.push({
        color: item
      })
    });
    setSearchResults(result);
  }
  return (
    <div className="App">
      <Form recentSearch={recentSearch} search={searchColors} />
      {error &&
        <Error />
      }
      {
        searchResults.length > 0 &&
        <React.Fragment>
          <h3 style={{ marginTop: '30px' }}>Possible Color Variations</h3>
          <DisplayColor colors={searchResults} />
        </React.Fragment>
      }
      {recentViews.length > 0 &&
        <RecentlyViewed colors={recentViews} />
      }
    </div>
  );
}

export default App;
