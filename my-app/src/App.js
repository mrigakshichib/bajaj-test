import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Ensure your App.css is correctly imported

function App() {
    const [data, setData] = useState('');
    const [filter, setFilter] = useState([]);
    const [response, setResponse] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);

    // Set the document title to your roll number
    useEffect(() => {
        document.title = "ABCD123"; // Replace with your actual roll number
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonData = JSON.parse(data);
            const result = await axios.post('http://127.0.0.1:8000/bfhl', jsonData);

            const options = [];
            if (result.data.numbers.length > 0) options.push("Numbers");
            if (result.data.alphabets.length > 0) options.push("Alphabets");
            if (result.data.highest_lowercase_alphabet) options.push("Highest Lowercase Alphabet");

            setDropdownOptions(options);
            setResponse(result.data);

        } catch (err) {
            console.error("Error submitting data", err);
        }
    };

    const renderFilteredResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        if (filter.includes("Numbers")) {
            filteredResponse.numbers = response.numbers.join(',');
        }
        if (filter.includes("Alphabets")) {
            filteredResponse.alphabets = response.alphabets.join(',');
        }
        if (filter.includes("Highest Lowercase Alphabet")) {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return (
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        );
    };

    return (
        <div className="App">
            <h1>Sample Output</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>API Input</label>
                    <textarea
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder='{"data":["M","1","334","4","B"]}'
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {response && (
                <div>
                    <label>Multi Filter</label>
                    <select multiple={true} value={filter} onChange={(e) => setFilter([...e.target.selectedOptions].map(o => o.value))}>
                        {dropdownOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}
            <div>
                <h3>Filtered Response</h3>
                {renderFilteredResponse()}
            </div>
        </div>
    );
}

export default App;
