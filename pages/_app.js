import "../styles/globals.css";
import normalize from "normalize.css";
import styled from "@emotion/styled";
import { colors } from "../constants/Colors";
import Image from "next/image";
import { AppWrapper } from "../context/state";

const PokedexOutterLayout = styled.div`
  background-color: ${colors.redPrimary};
  border: 4px solid black;
  height: 100vh;
  width: 100vw;
  padding: 50px 20px 80px 20px;
`;

const PokedexInnerLayout = styled.div`
  background-color: ${colors.grayDark};
  border: 4px solid black;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const PokedexLayout = styled.div`
  background-color: ${colors.gray};
  border: 4px solid black;
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
`;

const PokedexEarSpeakers = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -20%);
`;

const PokedexEarSpeaker = styled.div`
  background-color: ${colors.grayDark};
  width: 60px;
  height: 10px;
  top: 0px;
  border: 3.5px solid black;
  border-radius: 10px;
  margin: 10px;
`;

const PokedexIndicators = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 21px;
  right: 7px;
  transform: translate(-50%, -20%);
`;

const PokedexIndicator = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props) => colors[props.color]};
  border-radius: 70%;
  display: inline-block;
  border: 2px solid black;
  margin-left: 5px;
`;

const PokedexCamera = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${colors.blue};
  border-radius: 70%;
  display: inline-block;
  border: 4px solid black;
  position: absolute;
  top: 21px;
`;

const PokedexBottomBar = styled.div`
  margin-top: 10px;
  background-color: ${colors.grayDark};
  width: 100%;
  height: 50px;
  border: 4px solid black;
`;

const PokedexButton = styled.a`
  margin-left: 5rem;
  width: 80px;
`;

const PokedexButtonImage = styled(Image)`
  image-rendering: pixelated;
`;
const PokedexButtonContainer = styled.div`
  margin-left: -5rem;
  display: flex;
  justify-content: center;
`;

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <jsx>
        <PokedexOutterLayout>
          <PokedexCamera></PokedexCamera>
          <PokedexEarSpeakers>
            <PokedexEarSpeaker></PokedexEarSpeaker>
            <PokedexEarSpeaker></PokedexEarSpeaker>
          </PokedexEarSpeakers>

          <PokedexIndicators>
            <PokedexIndicator color="redSecondary"></PokedexIndicator>
            <PokedexIndicator color="green"></PokedexIndicator>
            <PokedexIndicator color="blue"></PokedexIndicator>
          </PokedexIndicators>

          <PokedexInnerLayout>
            <PokedexLayout>
              <Component key="component" {...pageProps} />
            </PokedexLayout>
          </PokedexInnerLayout>
          <PokedexBottomBar>
            <PokedexButtonContainer>
              <PokedexButton href="/">
                <PokedexButtonImage
                  src="/assets/pokemonsButton.png"
                  width="500px"
                  height="250px"
                ></PokedexButtonImage>
              </PokedexButton>
              <PokedexButton href="/MyPokemonList">
                <PokedexButtonImage
                  src="/assets/backpackButton.png"
                  width="500px"
                  height="250px"
                ></PokedexButtonImage>
              </PokedexButton>
            </PokedexButtonContainer>
          </PokedexBottomBar>
        </PokedexOutterLayout>
      </jsx>
    </AppWrapper>
  );
}

export default MyApp;
