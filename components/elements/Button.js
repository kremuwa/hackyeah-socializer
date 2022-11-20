import styled from "styled-components";

export const Button = styled.button`
  display: block;
  position: relative;
  padding: 0.8em 2.2em;
  cursor: pointer;
  color: black;

  border: none;
  border-radius: 0.4em;

  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 0.04em;

  mix-blend-mode: color-dodge;
  perspective: 500px;
  transform-style: preserve-3d;
  animation: rotateAngle 6s linear infinite;

  &:before,
  &:after {
    --z: 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    opacity: 0;
    mix-blend-mode: inherit;
    border-radius: inherit;
    transform-style: preserve-3d;
    transform: translate3d(
      calc(var(--z) * 0px),
      calc(var(--z) * 0px),
      calc(var(--z) * 0px)
    );
  }

  span {
    mix-blend-mode: none;
    display: block;
  }

  &:after {
    background-color: #5d00ff;
  }

  &:before {
    background-color: #ff1731;
  }

  &:hover {
    background-color: #fff65b;
    color: black;
    transition: background 0.3s 0.1s;
  }

  &:hover:before {
    --z: 0.04;
    animation: translateWobble 2.2s ease forwards;
  }

  &:hover:after {
    --z: -0.06;
    animation: translateWobble 2.2s ease forwards;
  }
`;
