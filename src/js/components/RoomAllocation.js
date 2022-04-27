import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Room from "./Room";

const Container = styled.div`
  padding: 15px;
  width: 330px;
  border: 1px solid rgb(30, 159, 210);
  border-radius: 4px;
  color: #333;

  .title {
    font-size: 20px;
  }

  .not-allocation-wrapper {
    padding: 10px;
    background: #F0FDFF;
    border: 1px solid #D2EDF7;
    border-radius: 4px;
    margin-top: 20px;
  }

  .rooms-wrapper {
    margin-top: 20px;
  }

  .line-block {
    width: 100%;
    height: 1px;
    background: #ccc;
    margin: 20px 0;
  }
`;

const RoomAllocation = ({ guest, room, onChange }) => {
  const [notAllocateTotalPeople, setNotAllocateTotalPeople] = useState(0);
  return (
    <Container>
      <div className="title">
        住客人數：<span>{guest}人</span> / <span>{room}房</span>
      </div>
      <div className="not-allocation-wrapper">
        <div className="not-allocation-wording">
          尚未分配人數：<span>{notAllocateTotalPeople} 人</span>
        </div>
      </div>
      <div className="rooms-wrapper">
        {
          Array.from({ length: room }).map((_, index) => (
            <>
              <Room
                key={index}
                guest={guest}
                onChange={onChange}
                index={index}
              />
              {index === room - 1 ? null : <div className="line-block" />}
            </>
          ))
        }
      </div>
    </Container>
  )
};

RoomAllocation.prototype = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default RoomAllocation;