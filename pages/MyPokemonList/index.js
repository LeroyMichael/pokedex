import React, { useEffect, useReducer, useState } from "react";
import styled from "@emotion/styled";
import styles from "../../styles/Home.module.css";
import ListPokemon from "../../components/ListPokemon";
import Head from "next/head";

const IWantMoreButton = styled.button`
  margin: 30px;
  border: 2px solid #000;
  background-color: rgba(0, 0, 0, 0);
  color: #000;
  padding: 14px 28px;
  font-size: 16px;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: #000;
    color: #fff;
  }
`;

const PageTitle = styled.h1`
  font-size: 2vh;
  margin-top: 1.5em;
`;

const index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [statePokemons, setStatePokemons] = useState({});
  useEffect(() => {
    const tempPokemons = localStorage.getItem("myPokemons");
    if (tempPokemons)
      setStatePokemons({
        pokemons: {
          results: JSON.parse(tempPokemons).pokemon,
        },
      });
  }, []);

  return (
    <>
      <Head>
        <title>My Pokemon List</title>
        <meta
          name="description"
          content="Show a list of Pokemons' names and the owned total."
        />
      </Head>
      <main className={styles.main}>
        <PageTitle>My Pokemon List </PageTitle>
        {/* All of the pokemons!! */}
        {statePokemons.pokemons ? (
          <h2></h2>
        ) : statePokemons.length > 20 ? (
          !isSearching ? (
            <IWantMoreButton
              onClick={() => {
                addMorePokemonList();
              }}
            >
              <h5>{isSearching ? "ok wait..." : "I want more!"}</h5>
            </IWantMoreButton>
          ) : (
            <p>Ok wait...</p>
          )
        ) : null}

        <ListPokemon pokemons={statePokemons.pokemons}></ListPokemon>
      </main>
    </>
  );
};

export default index;
