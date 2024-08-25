import React, { useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [originalResponse, setOriginalResponse] = useState(null); // Keep the original response
    const [filteredResponse, setFilteredResponse] = useState(null); // Keep the filtered response
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(jsonData);
            const res = await fetch('https://your-vercel-project-url.vercel.app/api/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });
            const result = await res.json();
            setOriginalResponse(result); // Store the original response
            setFilteredResponse(result); // Initially, set the filtered response to the full response
            setDropdownVisible(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilter = (selectedFilters) => {
        if (!originalResponse) return;

        const filteredResponse = {};

        selectedFilters.forEach((filter) => {
            if (filter === 'numbers' && originalResponse.numbers) {
                filteredResponse.numbers = originalResponse.numbers;
            } else if (filter === 'alphabets' && originalResponse.alphabets) {
                filteredResponse.alphabets = originalResponse.alphabets;
            } else if (filter === 'highest_lowercase_alphabet' && originalResponse.highest_lowercase_alphabet) {
                filteredResponse.highest_lowercase_alphabet = originalResponse.highest_lowercase_alphabet;
            }
        });

        setFilteredResponse(filteredResponse);
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

            {filteredResponse && (
                <div id="responseSection">
                    <h2>Filtered Response:</h2>
                    <pre id="responseData">{JSON.stringify(filteredResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
