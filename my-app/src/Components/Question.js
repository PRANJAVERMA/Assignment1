import React from "react";

const Question = ({ questionData, onAnswerSelect, selectedOption, correctAnswer }) => {
    const { question, options } = questionData;

    const getOptionStyle = (option) => {
        if (selectedOption) {
            if (option === correctAnswer) {
                return { backgroundColor: "#34c139", color: "white" }; // Green for correct answer
            }
            if (option === selectedOption && option !== correctAnswer) {
                return { backgroundColor: "#af322a", color: "white" }; // Red for incorrect answer
            }
        }
        return {}; // Default no style
    };

    return (
        <div>
            <h3>{question}</h3>
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <label
                            style={getOptionStyle(option)}
                        >
                            <input
                                type="radio"
                                name="question"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => onAnswerSelect(option)}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
