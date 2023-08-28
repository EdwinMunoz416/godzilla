import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7071/api/message", {
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers here
          }
        });
        setData(response.data.text);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  return <div>{data}</div>;
}

export default App;
