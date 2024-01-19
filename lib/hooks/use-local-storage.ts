"use client"
import { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.localStorage.getItem(key);
    if (item) {
      setStoredValue(JSON.parse(item));
    }
  }, [key]);

  const setValue = async (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    window.localStorage.setItem(key, JSON.stringify(value));

    try {
      // Post the data to the endpoint
      const response = await fetch( 'https://unlimitpotntlj.dataplane.rudderstack.com/v1/webhook?writeKey=2RU2pPygLiZDO7Sf4NJZpArq3Py', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Handle the response data
      const data = await response.json();
      console.log('Data saved:', data);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
