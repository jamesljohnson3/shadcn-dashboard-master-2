"use client"
import React, { createContext, useReducer, useContext } from 'react';

// Define initial state and reducer
const initialState = {
  videoSource: 'video', // 'video' or 'camera'
  isPlaying: false,
  predictions: null,
  chatMessages: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VIDEO_SOURCE':
      return { ...state, videoSource: action.payload };
    case 'TOGGLE_PLAYBACK':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };
