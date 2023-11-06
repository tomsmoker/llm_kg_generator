import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)