import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "../images/Logo.svg";
import UserInfoContext from "../context/UserInfoContext";

export default function SignInScreen() {
  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const { setToken } = useContext(UserInfoContext);

  const navigate = useNavigate();

  const URL = "https://icaro-projeto16-shortly.herokuapp.com/";

  function updateSigninInfo(event) {
    const { name, value } = event.target;
    setSigninInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function signinUser(event) {
    event.preventDefault();
    setDisabled(true);
    const promise = axios.post(`${URL}signin`, signinInfo);
    promise.then(({ data }) => {
      const { token } = data;
      setToken(token);
      navigate("/mylinks");
    });
    promise.catch((error) => {
      alert(error.response.data);
      setDisabled(false);
    });
  }

  return (
    <SignInContainer>
      <header>
        <h2 className="highlight" onClick={() => navigate("/signin")}>
          Entrar
        </h2>
        <h2 onClick={() => navigate("/signup")}>Cadastrar-se</h2>
      </header>
      <LogoImg src={Logo} alt="Logo" />
      <StyledForm onSubmit={signinUser}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          disabled={disabled}
          onChange={updateSigninInfo}
          value={signinInfo.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          disabled={disabled}
          onChange={updateSigninInfo}
          value={signinInfo.password}
        />
        <button type="submit" disabled={disabled}>
          Entrar
        </button>
      </StyledForm>
    </SignInContainer>
  );
}

const SignInContainer = styled.div`
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
`;

const LogoImg = styled.img`
  width: 314px;
  margin-bottom: 105px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 770px;
    height: 60px;
    border: 1px solid rgba(120, 177, 89, 0.25);
    box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
    border-radius: 12px;
    font-family: "Lexend Deca", sans-serif;
    margin-top: 25px;
    font-size: 14px;
    line-height: 18px;
    padding-left: 22px;

    &:disabled {
      background-color: #c9c9c9;
    }
  }

  button {
    width: 182px;
    height: 60px;
    border-radius: 12px;
    border: none;
    font-family: "Lexend Deca", sans-serif;
    color: #fff;
    background-color: #5d9040;
    cursor: pointer;
    font-size: 14px;
    line-height: 18px;
    margin-top: 61px;

    &:disabled {
      opacity: 0.5;
    }
  }
`;
