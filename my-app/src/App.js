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
            const res = await fetch('http://127.0.0.1:8000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: jsonData.split(',') }),
            });
            const result = await res.json();
            setResponse(result);
            setDropdownVisible(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFilter = async (selectedFilters) => {
        try {
            const res = await fetch('http://127.0.0.1:8000/bfhl', {
                method: 'GET',
            });
            const result = await res.json();
            let filteredResponse = {};
            selectedFilters.forEach(filter => {
                filteredResponse[filter] = result[filter];
            });
            setResponse(filteredResponse);
        } catch (error) {
            console.error('Error:', error);
        }
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
