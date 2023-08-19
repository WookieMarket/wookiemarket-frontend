import styled from "styled-components";

const accentColor = "var(--background-accept-button-color)";
const closedColor = "var(--background-reject-button-color)";

const Button = styled.button`
  cursor: pointer;
  background-color: ${props =>
    props.variant === "accept" ? accentColor : "white"};
  background-color: ${props =>
    props.variant === "decline" ? closedColor : "#13c1ac"};

  border-radius: 25px;
  border-style: solid;
  border-width: 1px;
  border-color: ${closedColor};
  color: ${props => (props.variant === "accept" ? "white" : "black")};
  display: inline-flex;
  align-items: center;
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 10px;
  min-height: 15px;
  justify-content: center;
  width: ${props => (props.width === "button-form" ? "35%" : "auto")};
  min-width: 45px;
  outline-style: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  padding: 6px 6px;

  text-decoration: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${props =>
      props.variant === "accept" ? accentColor : accentColor};
    color: ${props => (props.variant === "accept" ? "black" : "white")};
  }

  @media screen and (min-width: 768px) {
    width: ${props => (props.width === "button-form" ? "38%" : "auto")};
    font-size: 16px;
    padding: 7px 7px;
  }

  @media screen and (min-width: 1024px) {
    width: ${props => (props.width === "button-form" ? "45%" : "auto")};
    font-size: 17px;
    padding: 8px 8px;
  }

  text-decoration: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${props =>
      props.variant === "accept" ? accentColor : accentColor};
    color: ${props => (props.variant === "accept" ? "black" : "white")};
  }
`;

export default Button;
