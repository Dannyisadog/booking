import React from "react";
import styled from "styled-components";
import RoomAllocation from "./components/RoomAllocation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Home = () => {
  return (
    <Container>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={() => { }}
      />
    </Container>
  );
}

export default Home;