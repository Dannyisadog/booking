import React from "react";
import styled from "styled-components";
import CustomInputNumber from "./components/CustomInputNumber";

const Container = styled.div`

`;

const Home = () => {
  return (
    <Container>
      <h1>Home Page</h1>
      <CustomInputNumber
        value={0}
        min={0}
        step={1}
        max={20}
      />
    </Container>
  );
}

export default Home;