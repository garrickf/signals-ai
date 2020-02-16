import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import styled, { ThemeProvider } from 'styled-components';
import { Flex } from 'rebass';
import Journal from './sections/Journal';
import Insights from './sections/Insights';
import Sidebar from './sections/Sidebar';

function App() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const handleExpandSidebar = () => {
    setSidebarActive(a => !a)
  }

  return (
    <ThemeProvider theme={{}}>
      <Flex width="100vw" height="100vh" alignItems="center">
        <Insights handleExpandSidebar={handleExpandSidebar} />
        <Sidebar active={sidebarActive} />
        <Journal active={!sidebarActive} />
      </Flex>
    </ThemeProvider>
  );
}

export default App;
