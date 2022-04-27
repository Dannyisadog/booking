import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input:focus{
    outline: none;
}

  .block {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 16px;f
  }
  .block:last-child {
    margin-right: 0;
  }
  .minus-button,
  .plus-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")} !important;
    border: 1px solid ${props => (props.disabled ? "#ccc" : "rgb(30, 159, 210);")} !important;
    color: ${props => (props.disabled ? "#ccc" : "rgb(30, 159, 210);")} !important;
    font-size: 36px;
  }
  .minus-button {
    cursor: ${props => (props.minusDisabled ? "not-allowed" : "pointer")};;
    border: 1px solid ${props => (props.minusDisabled ? "#ccc" : "rgb(30, 159, 210);")};
    color: ${props => (props.minusDisabled ? "#ccc" : "rgb(30, 159, 210);")};
  }
  .plus-button {
    cursor: ${props => (props.plusDisabled ? "not-allowed" : "pointer")};;
    border: 1px solid ${props => (props.plusDisabled ? "#ccc" : "rgb(30, 159, 210);")};
    color: ${props => (props.plusDisabled ? "#ccc" : "rgb(30, 159, 210);")};
  }
  .input-area {
    text-align: center;
    border: 0;
    padding: 0;
    border: 1px solid #ccc;
  }
`;

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) => {
  const [oldValue, setOldValue] = useState(value);
  const [minusDisabled, setMinusDisabled] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const inputRef = useRef(null);
  const doActions = ({ type, value = 0 }) => {
    if (disabled) return;
    switch (type) {
      case "plus":
        if (inputRef.current.value < max && parseInt(inputRef.current.value) + 1 * step <= max) {
          inputRef.current.value =
            parseInt(inputRef.current.value) + 1 * step;
        }
        break;
      case "minus":
        if (inputRef.current.value > min && parseInt(inputRef.current.value) - 1 * step >= min) {
          inputRef.current.value =
            parseInt(inputRef.current.value) - 1 * step;
        }
        break;
      case "set":
        if (inputRef.current.value < min || value === '') {
          inputRef.current.value = min;
        } else if (inputRef.current.value > max) {
          inputRef.current.value = max;
        } else {
          inputRef.current.value = value;
        }
        break;
      case "init":
        break;
      default:
        break;
    }
    if (parseInt(inputRef.current.value) === parseInt(oldValue)) return;
    setMinusDisabled(parseInt(inputRef.current.value) <= min);
    setPlusDisabled(parseInt(inputRef.current.value) >= max);
    setOldValue(parseInt(inputRef.current.value));
    onChange({
      value: inputRef.current.value,
    });
  }

  const longPressHandler = ({ type }) => {
    const newIntervalId = setInterval(() => {
      doActions({ type });
    }, 80);
    setIntervalId(newIntervalId);
  }

  const clearLongPressTimer = () => {
    clearInterval(intervalId);
    setIntervalId(0);
  }

  useEffect(() => {
    doActions({ type: 'init' });
  }, []);

  return (
    <Container
      disabled={disabled}
      minusDisabled={minusDisabled}
      plusDisabled={plusDisabled}
    >
      <div className="minus-button block"
        onMouseDown={() => longPressHandler({ type: "minus" })}
        onMouseUp={clearLongPressTimer}
      >
        -
      </div>
      <input
        ref={inputRef}
        className="input-area block"
        type="number"
        defaultValue={value}
        onChange={(e) => {
          doActions({ type: "set", value: e.target.value });
        }}
        min={min}
        max={max}
        disabled={disabled}
        step={step}
        name={name}
        onBlur={onBlur}
      />
      <div className="plus-button block"
        onMouseDown={() => longPressHandler({ type: "plus" })}
        onMouseUp={clearLongPressTimer}
      >
        +
      </div>
    </Container>
  );
}

CustomInputNumber.defaultProps = {
  step: 1
}

CustomInputNumber.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}

export default CustomInputNumber;