import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IoTrashSharp } from "react-icons/io5";

import Logo from "../images/Logo.svg";
import UserInfoContext from "../context/UserInfoContext";

export default function MyLinksScreen() {
  dotenv.config();

  const { token, setToken } = useContext(UserInfoContext);
  const [userInfos, setUserInfos] = useState({});
  const [urlInfo, setUrlInfo] = useState("");
  const navigate = useNavigate();

  const URL = "https://icaro-projeto16-shortly.herokuapp.com/";

  useEffect(() => {
    if (!token.token) {
      navigate("/");
    } else {
      const secretKey = process.env.REACT_APP_JWT_KEY;
      const user = jwt.verify(token.token, secretKey);
      const promise = axios.get(`${URL}users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      promise.then(({ data }) => {
        setUserInfos({ ...data });
      });
      promise.catch((error) => console.log(error.response));
    }
  }, [navigate, token]);

  function deleteShortUrl(id) {
    if (window.confirm()) {
      const promise = axios.delete(`${URL}urls/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      promise.then((response) => {
        setToken({ ...token });
      });
      promise.catch((error) => alert(error.response.data));
    }
  }

  function postShortUrl(event) {
    event.preventDefault();
    const promise = axios.post(
      `${URL}urls/shorten`,
      { url: urlInfo },
      {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    promise.then((response) => setToken({ ...token }));
    promise.catch((error) => alert(error.response.data));
  }

  return (
    <MyLinksScreenContainer>
      <header>
        <h2 className="highlight">
          Seja bem-vindo(a), {userInfos.name ? userInfos.name : ""}
        </h2>
        <nav>
          <h2 onClick={() => navigate("/mylinks")}>Home</h2>
          <h2 onClick={() => navigate("/ranking")}>Ranking</h2>
          <h2 className="logout" onClick={() => setToken({})}>
            Sair
          </h2>
        </nav>
      </header>
      <LogoImg src={Logo} alt="Logo" />
      <ShortenForm onSubmit={postShortUrl}>
        <input
          type="url"
          placeholder="Links que cabem no bolso"
          onChange={(event) => setUrlInfo(event.target.value)}
          value={urlInfo}
        />
        <button type="submit">Encurtar link</button>
      </ShortenForm>
      {userInfos.shortenedUrls?.length > 0 ? (
        userInfos.shortenedUrls.map((urlInfo, index) => (
          <UrlContainer key={index}>
            <InfoContainer href={`${URL}urls/open/${urlInfo.shortUrl}`}>
              <p>{urlInfo.url}</p>
              <p>{urlInfo.shortUrl}</p>
              <p>Quantidade de visitantes: {urlInfo.visitCount}</p>
            </InfoContainer>
            <TrashContainer>
              <IoTrashSharp
                className="trash"
                onClick={() => deleteShortUrl(urlInfo.id)}
              />
            </TrashContainer>
          </UrlContainer>
        ))
      ) : (
        <></>
      )}
    </MyLinksScreenContainer>
  );
}

const MyLinksScreenContainer = styled.div`
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

const ShortenForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 59px;

  input {
    font-family: "Lexend Deca", sans-serif;
    width: 769px;
    height: 60px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px;
    padding-left: 22px;
    font-size: 14px;
    line-height: 18px;
  }

  button {
    font-family: "Lexend Deca", sans-serif;
    width: 182px;
    height: 60px;
    color: #fff;
    background-color: #5d9040;
    border-radius: 12px;
    border: none;
    margin-left: 70px;
    font-size: 14px;
    line-height: 18px;
  }
`;

const UrlContainer = styled.div`
  width: 1020px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(120, 177, 89, 0.25);
  margin-bottom: 42px;
  border-radius: 12px;
`;

const InfoContainer = styled.a`
  width: 887px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 94px 0 21px;
  background-color: #80cc74;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  border-radius: 12px 0px 0px 12px;
  text-decoration: none;

  p {
    max-width: 250px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
  }
`;

const TrashContainer = styled.div`
  width: 130px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

  .trash {
    color: #ea4f4f;
    font-size: 26px;
  }
`;
