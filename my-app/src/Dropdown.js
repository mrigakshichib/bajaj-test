import React, { useState } from 'react';

function Dropdown({ onFilterSelect }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleClick = () => {
        if (selectedOption) {
            onFilterSelect([selectedOption]); // Wrap the single selected option in an array
        }
    };

    return (
        <div id="dropdownSection">
            <h2>Select Data to Filter:</h2>
            <select onChange={handleChange} value={selectedOption}>
                <option value="">-- Select an option --</option>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            <button onClick={handleClick} disabled={!selectedOption}>Filter Data</button>
        </div>
    );
}

export default Dropdown;
