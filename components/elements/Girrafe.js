import styled, {css} from "styled-components";

const GiraffeSecond = css`
  .cartoon {
    left: inherit;
    right: 0;
    height: 60vmin;
    transform: scaleX(-1);
  }

  .head::after {
    animation-delay: 2s;
  }
`

const GiraffeWrapper = styled.div`
  z-index: 0;
  overflow: hidden;
  padding-top: 3vh;

  .cartoon {
    position: absolute;
    bottom: 0;
    left: 30%;
    transform: translate(-50%, 0);
    width: 65vmin;
    height: 70vmin;
    overflow: visible;
  }
  
  .cartoon div {
    position: absolute;
    box-sizing: border-box;
  }

  .b {
    border: 0.5vmin solid;
  }

  .r {
    border-radius: 100%;
  }

  .hb::before,
  .ha::after {
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
  }

  .cartoon {
    --brown: #a75;
    --yellow: #fe9;
    --hair: #631;
  }

  .mouth {
    background: var(--brown);
    width: 28%;
    height: 18%;
    top: 27%;
    left: 50%;
    transform: translate(-50%, 0) rotate(-25deg);
  }

  .mouth::before {
    width: 1.5vmin;
    height: 1.5vmin;
    background: black;
    border-radius: 50%;
    left: 50%;
    box-shadow: 0 0 0 1.5vmin var(--brown),
    6vmin 1vmin black,
    6vmin 1vmin 0 1.5vmin var(--brown);
  }

  .mouth::after {
    width: 50%;
    height: 40%;
    border: 0.25vmin solid transparent;
    border-left: 0.75vmin solid transparent;
    border-radius: 50%;
    border-bottom: 0.5vmin solid;
    transform: rotate(30deg);
    top: 40%;
    left: 10%;
  }

  .head {
    width: 23%;
    height: 40%;
    background: var(--yellow);
    border-radius: 100% / 110% 110% 80% 80%;
    transform-origin: bottom right;
    transform: rotate(-20deg);
    top: 1%;
    left: 33%;
  }

  .head::after {
    width: 2vmin;
    height: 2vmin;
    border-radius: 50%;
    background: black;
    top: 40%;
    left: 45%;
    box-shadow: 6vmin 0 black;
    animation: blink-animation 3s steps(5, start) infinite;
  }

  .head::before {
    width: 50%;
    height: 30%;
    border-radius: 50%;
    box-shadow: inset -3vmin 1vmin var(--hair);
    left: 32%;
    top: -2%;
  }

  .ear {
    width: 10%;
    height: 10%;
    border-radius: 100% 0;
    background: var(--yellow);
    top: 10%;
    left: 17%;
    transform: rotate(15deg);
    box-shadow: 15vmin -10vmin var(--yellow);
  }

  .horn {
    width: 3%;
    height: 10%;
    background: var(--yellow);
    transform: rotate(-35deg);
    left: 25%;
    top: 2%;
  }

  .horn::before {
    width: 100%;
    height: 100%;
    background: var(--yellow);
    transform: rotate(30deg);
    left: 240%;
    top: 20%;
  }

  .horn::after {
    width: 5vmin;
    height: 5vmin;
    border-radius: 50%;
    background: var(--yellow);
    left: 50%;
    top: -10%;
    transform: translate(-50%, -50%);
    box-shadow: 8vmin 2vmin var(--yellow);
  }

  .neck, .hair {
    width: 10%;
    height: 200%;
    background: var(--yellow);
    top: 15%;
    left: 27.5%;
    box-shadow: inset 0 25vmin 10vmin -9vmin var(--brown);
    overflow: hidden;
  }

  .neck::before {
    width: 5vmin;
    height: 6vmin;
    background: var(--brown);
    color: var(--brown);
    top: 20%;
    border-radius: 50%;
    left: -15%;
    box-shadow: 5vmin -10vmin 0 1vmin,
    7vmin 10vmin 0 1vmin,
    6vmin 15vmin 0 2vmin,
    4vmin 30vmin 0 -1vmin,
    1vmin 40vmin 0 2vmin;
  }


  .hair {
    background: var(--hair);
    left: 22%;
    box-shadow: none;
    transform: rotate(1.5deg);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 10% 49.5%, 0% 49%, 0% 20%, 10% 19.5%, 0% 19%, 5% 18.75%, 0% 18.5%)
  }

  ${props => props.kind !== 2 && GiraffeSecond}
  
  @keyframes blink-animation {
    0% {
      visibility: visible;
    }
    90% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
    }
  }
`

export const Giraffe = ({kind}) => {
    return <GiraffeWrapper kind={kind}>
        <div className="cartoon hb">
            <div className="hair"></div>
            <div className="neck hb"></div>
            <div className="ear"></div>
            <div className="horn ha hb"></div>
            <div className="head hb ha"></div>
            <div className="mouth hb ha r"></div>
        </div>
    </GiraffeWrapper>

}
