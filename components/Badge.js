import React from "react";
import styled from "@emotion/styled";
import { typeColors } from "../constants/Colors";
import { colors } from "../constants/Colors";

const Badge = styled.span`
  background-color: ${(props) => typeColors[props.typeColor]};
  color: #fff;
  padding: 5px 20px;
  border-radius: 10px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  box-shadow: 0.2rem 0.2rem ${colors.grayDark};
`;

const BadgeComponent = ({ pokemonType }) => {
  return (
    <>
      <Badge className="badge-button" typeColor={pokemonType}>
        {pokemonType}
      </Badge>
    </>
  );
};

export default BadgeComponent;
