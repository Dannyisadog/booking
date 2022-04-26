import React from "react";

import Home from "./Home";

import styled from "styled-components";

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
`;

const App = () => {
  return (
    <Container>
      <Home />
    </Container>
  )
};

export default App;