import React, { useState } from 'react';

function Dropdown({ onFilterSelect }) {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedOptions(selected);
    };

    const handleClick = () => {
        onFilterSelect(selectedOptions);
    };

    return (
        <div id="dropdownSection">
            <h2>Select Data to Filter:</h2>
            <select multiple onChange={handleChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>
            <button onClick={handleClick}>Filter Data</button>
        </div>
    );
}

export default Dropdown;
