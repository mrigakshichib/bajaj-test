import React, { useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(jsonData);
            const res = await fetch('http://127.0.0.1:8000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });
            const result = await res.json();
            setResponse(result);
            setDropdownVisible(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilter = (selectedFilters) => {
        if (!response) return;

        const filteredResponse = {};

        selectedFilters.forEach((filter) => {
            if (filter === 'numbers') {
                filteredResponse.numbers = response.numbers;
            } else if (filter === 'alphabets') {
                filteredResponse.alphabets = response.alphabets;
            } else if (filter === 'highest_lowercase_alphabet') {
                filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
            }
        });

        setResponse(filteredResponse);
    };

    return (
        <div className="container">
            <h1>JSON Data Submission</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="jsonData">Enter JSON Data (comma separated):</label>
                <textarea
                    id="jsonData"
                    rows="4"
                    cols="50"
                    value={jsonData}
                    onChange={(e) => setJsonData(e.target.value)}
                ></textarea>
                <button type="submit">Submit</button>
            </form>

            {dropdownVisible && (
                <Dropdown onFilterSelect={handleFilter} />
            )}

            {response && (
                <div id="responseSection">
                    <h2>Filtered Response:</h2>
                    <pre id="responseData">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
