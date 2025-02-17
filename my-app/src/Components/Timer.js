import React, { useState, useEffect } from "react";

const Timer = ({ initialTime, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp(); // Call the function when time is up
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft, onTimeUp]);

    return (
        <div>
            <h3>Time Left: {timeLeft} seconds</h3>
        </div>
    );
};

export default Timer;
