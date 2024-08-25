import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://your-backend-service.com/bfhl', parsedInput); // Replace with your backend URL
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or network error');
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <div>
            <label>Filter Response:</label>
            <select multiple={true} onChange={handleOptionChange}>
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
          </div>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
