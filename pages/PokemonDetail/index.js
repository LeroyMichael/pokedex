import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import client from "../../apollo-client";
import { gql } from "@apollo/client";
import styled from "@emotion/styled";
import BadgeComponent from "../../components/Badge";
import { colors } from "../../constants/Colors";
import Head from "next/head";

const Sprite = styled.img`
  width: 200px;
  image-rendering: pixelated;
  background: url(/assets/own.svg) center center / cover;
`;

const Pokemon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 58vh;
`;

const PokemonTypes = styled.div`
  display: flex;
`;

const PokemonData = styled.div`
  align-items: center;
  background-color: ${colors.white};
  width: 200px;
  display: flex;
  padding: 2rem 0rem;
  flex-direction: column;
  box-shadow: 0.2rem 0.2rem ${colors.grayDark};
  overflow-y: auto;
  height: 100%;
`;

const CatchPokemonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const CatchPokemon = styled.img`
  width: $(props => props.width);
  margin-top: 1rem;
  cursor: pointer;
  image-rendering: pixelated;
`;

const CatchPokemonDetail = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  bottom: 10px;
  align-items: center;
`;

const PokemonName = styled.div`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
`;

const Notification = styled.span`
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem;
`;

const InputNickname = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
`;

const AbilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

const LoadingBar = styled.div`
  width: 100%;

  height: 100%;
`;

const PokemonDetail = () => {
  const router = useRouter();
  const pokemonName = router.query.name;
  const [pokemon, setPokemon] = useState({});
  const [types, setTypes] = useState([]);
  const [nickname, setNickname] = useState("");
  const [catchState, setCatchState] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const [myPokemons] = useState();

  // useEffect(() => {
  //   localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  // }, [myPokemons]);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemon(pokemonName);
    } else {
    }
  }, [pokemonName]);

  const fetchPokemon = async (pokemonName) => {
    const { data } = await client.query({
      query: gql`
        query pokemon($name: String = "${pokemonName}") {
          pokemon(name: $name) {
            id
            name
            height
            weight
            abilities {
              ability {
                url
                name
              }
            }
            sprites {
              front_default
              back_default
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
            }
          }
        }
      `,
    });

    setPokemon(data.pokemon);
    setTypes([...data.pokemon.types.map((type) => type.type.name)]);

    setAbilities([...data.pokemon.abilities.map((ability) => ability)]);
    setMoves([...data.pokemon.moves.map((move) => move.move.name)]);
    setNickname(data.pokemon.name);

    setIsLoading(false);
  };

  const calculateCatchResults = () => {
    if (Math.random() >= 0.5) {
      setCatchState("success");
      return "success";
    } else {
      setCatchState("fail");
      return "fail";
    }
  };
  const setCatchStateNull = () => {
    setErrorMessage("");
    setCatchState("");
  };

  const savePokemon = () => {
    const sharedState = {
      id: pokemon.id,
      nickname: nickname,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      imageBack: pokemon.sprites.back_default,
    };

    const tempMyPokemons = { pokemon: [] };
    const getMyPokemons = JSON.parse(localStorage.getItem("myPokemons"));

    if (getMyPokemons) {
      Array.prototype.push.apply(tempMyPokemons.pokemon, getMyPokemons.pokemon);
    }

    if (tempMyPokemons.pokemon.some((e) => e.nickname == nickname)) {
      setErrorMessage("Hmm... this nickname is already taken");
    } else if (nickname.length > 12 || nickname.length < 3) {
      setErrorMessage("Nickname must be between 3 and 12 characters");
    } else {
      tempMyPokemons.pokemon.push(sharedState);
      localStorage.setItem("myPokemons", JSON.stringify(tempMyPokemons));
      setCatchStateNull();
    }
  };

  const usePokeball = () => {
    if (calculateCatchResults() === "success") {
      console.log("catch");
      // savePokemon();
    }
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
        <meta
          name="description"
          content="Show a list of Pokemons' names and the owned total."
        />
      </Head>
      <main>
        <div css="resetScrollbar">
          {isLoading ? (
            <LoadingBar>Loading...</LoadingBar>
          ) : (
            <Pokemon>
              <Notification>
                {catchState === "success"
                  ? "GOTCHA!!!"
                  : catchState === "fail"
                  ? "This Pokemon doesn't like u sorry :("
                  : null}
              </Notification>
              <Sprite
                src={
                  catchState === "success" || catchState === ""
                    ? pokemon.sprites?.front_default
                    : pokemon.sprites?.back_default
                }
                alt={pokemon.name}
              />
              <PokemonTypes>
                {types.map((type) => (
                  <BadgeComponent pokemonType={type}></BadgeComponent>
                ))}
              </PokemonTypes>
              {catchState === "success" ? (
                <div>
                  <InputNickname>
                    <h4>Enter Nickname {handleChange}</h4>
                    <input value={nickname} onChange={handleChange}></input>
                  </InputNickname>
                  <CatchPokemonContainer>
                    <CatchPokemon
                      src="/assets/release.png"
                      onClick={setCatchStateNull}
                      alt="release"
                      width="100px"
                      height="30px"
                    ></CatchPokemon>
                    <CatchPokemon
                      src="/assets/catch.png"
                      onClick={savePokemon}
                      alt="catch"
                      width="80px"
                      height="30px"
                    ></CatchPokemon>
                  </CatchPokemonContainer>
                </div>
              ) : catchState === "fail" ? (
                <CatchPokemon
                  src="/assets/okButton.png"
                  onClick={setCatchStateNull}
                  alt="fail"
                  width="100px"
                ></CatchPokemon>
              ) : (
                <PokemonData>
                  <h5>Abilities</h5>
                  <AbilitiesContainer>
                    {abilities.map((ability, i) => (
                      <p key={i}>{ability.ability.name}</p>
                    ))}
                  </AbilitiesContainer>

                  <h5>Moves</h5>
                  <AbilitiesContainer>
                    {moves.map((move, i) => (
                      <p key={i}>{move}</p>
                    ))}
                  </AbilitiesContainer>
                </PokemonData>
              )}
              {errorMessage ? (
                <ErrorMessage>{errorMessage}</ErrorMessage>
              ) : null}
              {catchState === "success" || catchState === "fail" ? (
                <></>
              ) : (
                <CatchPokemonDetail onClick={usePokeball}>
                  <h3>Catch</h3>
                  <PokemonName>{pokemon.name}</PokemonName>
                  <CatchPokemon
                    src="/assets/pokeball.png"
                    width="40px"
                  ></CatchPokemon>
                </CatchPokemonDetail>
              )}
            </Pokemon>
          )}
        </div>
      </main>
    </>
  );
};

export default PokemonDetail;
