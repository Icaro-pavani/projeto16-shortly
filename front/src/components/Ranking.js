import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";

import Logo from "../images/Logo.svg";
import Vector from "../images/Vector.svg";
import UserInfoContext from "../context/UserInfoContext";

export default function Ranking() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(UserInfoContext);
  const [ranking, setRanking] = useState([]);
  const [name, setName] = useState("");

  const URL = "https://icaro-projeto16-shortly.herokuapp.com/";

  useEffect(() => {
    if (!token.token) {
      navigate("/");
    } else {
      const secretKey = process.env.REACT_APP_JWT_KEY;
      const user = jwt.verify(token.token, secretKey);
      setName(user.name);
      const promise = axios.get(`${URL}ranking`);
      promise.then(({ data }) => {
        setRanking([...data]);
      });
      promise.catch((error) => console.log(error));
    }
  }, [navigate, token]);
  return (
    <Container>
      <header>
        <h2 className="highlight">Seja bem-vindo(a), {name ? name : ""}</h2>
        <nav>
          <h2 onClick={() => navigate("/mylinks")}>Home</h2>
          <h2 onClick={() => navigate("/ranking")}>Ranking</h2>
          <h2 className="logout" onClick={() => setToken({})}>
            Sair
          </h2>
        </nav>
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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 5% 0;

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
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

    nav {
      display: flex;

      h2 {
        margin-left: 27px;
      }

      .logout {
        text-decoration: underline;
      }
    }
  }
`;

const LogoImg = styled.img`
  width: 314px;
  margin-bottom: 105px;
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
    margin-bottom: 13px;
  }
`;
