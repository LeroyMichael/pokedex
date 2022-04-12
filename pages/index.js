import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import ListPokemon from "../components/ListPokemon";
import client from "../apollo-client";
import { gql } from "@apollo/client";

const ThemeToggler = styled.button`
  margin-top: 30px;
  border: 2px solid #000;
  background-color: rgba(0, 0, 0, 0);
  color: #000;
  padding: 14px 28px;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    background-color: #000;
    color: #fff;
  }
`;

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

export default function Home({ pokemons }) {
  const [isDark, setIsDark] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [statePokemons, setStatePokemons] = useState(pokemons);

  const addMorePokemonList = () => {
    setIsSearching(true);

    const newPokemons = getMorePokemon(statePokemons.nextOffset).then(function (
      value
    ) {
      return value.data.pokemons;
    });

    const getPokemons = async () => {
      const a = await newPokemons;
      const newTempPokemons = statePokemons;
      newTempPokemons.results = [...newTempPokemons.results, ...a.results];
      newTempPokemons.nextOffset = a.nextOffset;
      setStatePokemons(newTempPokemons);
    };

    getPokemons();
    setTimeout(function () {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List Page</title>
        <meta
          name="description"
          content="Show a list of Pokemons' names and the owned total."
        />
      </Head>

      <main className={styles.main}>
        {/* <ThemeToggler
          onClick={() => {
            setIsDark(!isDark);
          }}
        >
          Change to {isDark ? "light" : "dark"} mode
        </ThemeToggler> */}
        {/* All of the pokemons!! */}

        <PageTitle>Pokemon List</PageTitle>
        {!isSearching ? (
          <ListPokemon pokemons={statePokemons}></ListPokemon>
        ) : (
          <ListPokemon pokemons={statePokemons}></ListPokemon>
        )}
        {!isSearching ? (
          <IWantMoreButton
            onClick={() => {
              addMorePokemonList();
            }}
          >
            <h5>I want more!</h5>
          </IWantMoreButton>
        ) : (
          <IWantMoreButton>
            <h5>ok wait...</h5>
          </IWantMoreButton>
        )}
      </main>
    </div>
  );
}

function getMorePokemon(nextOffset) {
  const value = client.query({
    query: gql`
      query pokemons($limit: Int, $offset: Int = ${nextOffset}) {
        pokemons(limit: $limit, offset: $offset) {
          count
          nextOffset
          previous
          status
          message
          results {
            url
            name
            image
            id
          }
        }
      }
    `,
  });
  return Promise.resolve(value);
}

const { data } = await client.query({
  query: gql`
    query pokemons($limit: Int, $offset: Int = 0) {
      pokemons(limit: $limit, offset: $offset) {
        count
        nextOffset
        previous
        status
        message
        results {
          url
          name
          image
          id
        }
      }
    }
  `,
});

const gqlVariables = {
  limit: 2,
  offset: 0,
};

export const Todos = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("Response from server", data);
  return "Success!";
};

export async function getStaticProps() {
  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}
