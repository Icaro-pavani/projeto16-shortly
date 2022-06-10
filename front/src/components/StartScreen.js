import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../images/Logo.svg";
import Vector from "../images/Vector.svg";

export default function StartScreen() {
  const URL = "https://icaro-projeto16-shortly.herokuapp.com/";

  const [ranking, setRanking] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(`${URL}ranking`);
    promise.then(({ data }) => {
      setRanking([...data]);
    });
    promise.catch((error) => console.log(error));
  }, []);
  return (
    <StartScreenContainer>
      <header>
        <h2 className="highlight" onClick={() => navigate("/signin")}>
          Entrar
        </h2>
        <h2 onClick={() => navigate("/signup")}>Cadastrar-se</h2>
      </header>
      <LogoImg src={Logo} alt="Logo" />
      <RankingTitle>
        <img src={Vector} alt="trophy" />
        <h1>Ranking</h1>
      </RankingTitle>
      <RankingContainer>
        {ranking.length === 0
          ? "Loading..."
          : ranking.map((person, index) => (
              <p key={index}>
                {index + 1}. {person.name} - {person.linksCount} links -{" "}
                {person.visitCount} visualizações
              </p>
            ))}
      </RankingContainer>
      <h3>Crie sua conta para user nosso serviço!</h3>
    </StartScreenContainer>
  );
}

const StartScreenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 5% 0;

  header {
    width: 100%;
    display: flex;
    justify-content: right;
    margin-bottom: 17px;

    h2 {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #9c9c9c;
      margin-right: 22px;
      cursor: pointer;

      &.highlight {
        color: #5d9040;
        opacity: 0.9;
      }
    }
  }

  h3 {
    font-size: 36px;
    line-height: 45px;
    font-weight: 700;
    margin-top: 82px;
  }
`;

const LogoImg = styled.img`
  width: 314px;
  margin-bottom: 80px;
`;

const RankingTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 55px;

  h1 {
    font-weight: 700;
    font-size: 36px;
    line-height: 45px;
    margin-left: 10px;
  }
`;

const RankingContainer = styled.div`
  width: 1017px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  border-radius: 24px 24px 0 0;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  padding: 19px 40px 30px;

  p {
    width: 100%;
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
  }
`;
