import React, { useState } from "react";
import styled from "styled-components";

import CustomInputNumber from "./CustomInputNumber";

const Container = styled.div`
  .row-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .row-wrapper {
    margin-top: 20px;
  }

  .adult-wording {
    .subtitle {
      font-size: 14px;
      color: #999;
    }
  }
`;

const Room = () => {
  const [guest, setGuest] = useState(0);
  return (
    <Container>
      <div className="total-guest-wording">
        房間：<span>{guest}人</span>
      </div>
      <div className="adult-wrapper row-wrapper">
        <div className="adult-wording">
          <div>大人</div>
          <div className="subtitle">年齡 20+</div>
        </div>
        <CustomInputNumber
          min={0}
          max={10}
          value={0}
        />
      </div>
      <div className="children-wrapper row-wrapper">
        <div className="children-wording">
          <div>小孩</div>
        </div>
        <CustomInputNumber
          min={0}
          max={10}
          value={0}
        />
      </div>
    </Container>
  );
}

export default Room;