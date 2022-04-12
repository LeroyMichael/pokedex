import React, { useState, useEffect } from "react";
import BadgeComponent from "./Badge";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import { colors } from "../constants/Colors";
import Image from "next/image";
import Router from "next/router";

const Card = styled.a`
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 1rem 0 1rem 1rem;
  text-align: left;
  text-decoration: none;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 90%;
  max-width: 300px;
  display: flex;
  height: 90px;
  font-size: 0.4rem;
  margin: 1rem 1rem 1rem 1rem;
  justify-content: space-between;
  box-shadow: 0.2rem 0.2rem ${colors.grayDark};
  cursor: ${(props) =>
    props.pathname === "/MyPokemonList" ? "default" : "pointer"};
`;

const Sprite = styled.img`
  width: 90px;
  height: 90px;
  margin-top: -1rem;
  margin-left: -1rem;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-transform: capitalize;
  position: absolute;
  padding: 2.5rem;
  margin-left: 5.5rem;
  z-index: 2;
`;
const PokemonOwned = styled(Image)`
  width: 60px !important;
  height: 60px !important;
  min-width: 60px !important;
  max-width: 60px !important;
  min-height: 60px !important;
  max-height: 60px !important;
  margin-left: 30px !important;
`;
const CardLeft = styled.div`
  display: flex;
`;

const NoPokemon = styled.h2`
  text-align: center;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 50%;
`;

const TrashButtonContainer = styled.a`
  width: 40px;
  height: 100%;
  padding-top: 1.5rem;
  cursor: pointer;
`;

const TrashButton = styled(Image)``;

const ListPokemon = ({ pokemons }) => {
  const [ownedPokemons, setOwnedPokemons] = useState({ pokemons: [] });
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    const tempPokemons = JSON.parse(localStorage.getItem("myPokemons"));
    if (tempPokemons) setOwnedPokemons({ pokemons: [...tempPokemons.pokemon] });
    setPathname(window.location.pathname);
  }, []);

  const release = (pokemonId) => {
    pokemons.results.splice(pokemonId, pokemonId + 1);
    setOwnedPokemons({ pokemons: pokemons.results });
    localStorage.setItem(
      "myPokemons",
      JSON.stringify({
        pokemon: [...pokemons.results],
      })
    );
  };

  return (
    <div className={styles.grid}>
      {ownedPokemons.pokemons.length === 0 && pathname === "/MyPokemonList" ? (
        <NoPokemon>No Pokemon :(</NoPokemon>
      ) : (
        pokemons?.results?.map((pokemon, i) => {
          let formattedNumber = pokemon.id.toLocaleString("en-US", {
            minimumIntegerDigits: 3,
            useGrouping: false,
          });
          return (
            <Card
              key={pokemon.id}
              onClick={() => {
                if (pathname !== "/MyPokemonList") {
                  Router.push({
                    pathname: "/PokemonDetail",
                    query: { name: pokemon.name },
                  });
                }
              }}
              pathname={pathname}
            >
              <CardLeft>
                <Sprite src={pokemon.image} alt={pokemon.name} />
                <CardDetail>
                  <h3>
                    {formattedNumber}
                    {pathname === "/MyPokemonList"
                      ? null
                      : "/" +
                        ownedPokemons.pokemons.filter((e) => e.id == pokemon.id)
                          .length}
                  </h3>
                  <h2>{pokemon.nickname ? pokemon.nickname : pokemon.name}</h2>
                </CardDetail>
              </CardLeft>
              {ownedPokemons.pokemons.some((e) => e.id === pokemon.id) &&
              pathname !== "/MyPokemonList" ? (
                <PokemonOwned
                  src="/assets/own.svg"
                  width="60px"
                  height="60px"
                  alt="pokemon owned"
                ></PokemonOwned>
              ) : pathname === "/MyPokemonList" ? (
                <TrashButtonContainer
                  onClick={() => {
                    release(i);
                  }}
                >
                  <TrashButton
                    src="/assets/trash.png"
                    width="70px"
                    height="70px"
                    alt="trash"
                  ></TrashButton>
                </TrashButtonContainer>
              ) : null}
            </Card>
          );
        })
      )}
    </div>
  );
};

export default ListPokemon;
