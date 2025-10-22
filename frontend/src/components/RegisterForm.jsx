import "../style/RegisterForm.css";
import { useState } from "react";
const RegisterForm = ({ isExist, onRegister }) => {
  const formCheck = async (name) => {
    const newErrMsg = {};
    const idRegex = /^[a-z0-9]*$/;
    if (!input.id) {
      newErrMsg.id = "아이디를 입력해주세요.";
    } else if (await isExist(input.id)) {
      newErrMsg.id = "사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요.";
    } else if (!idRegex.test(input.id)) {
      newErrMsg.id = "ID는 영문 소문자와 숫자만 입력 가능합니다.";
    }
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!input.pw) {
      newErrMsg.pw = "비밀번호를 입력해주세요.";
    } else if (!pwRegex.test(input.pw)) {
      newErrMsg.pw =
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
    }
    const hpRegex = /^01[0-9]{1}-\d{3,4}-\d{4}$/;
    if (!input.hp) {
      newErrMsg.hp = "연락처를 입력해주세요.";
    } else if (!hpRegex.test(input.hp)) {
      newErrMsg.hp = "올바른 연락처 형식을 입력해 주세요. (예: 010-1234-5678)";
    }
    setErrMsg(name ? { ...errMsg, [name]: newErrMsg[name] } : newErrMsg);
    return JSON.stringify(newErrMsg) === "{}";
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!await formCheck()) return;
    onRegister(input.id, input.pw, input.hp);
  };
  const [focus, setFocus] = useState({
    id: false,
    pw: false,
    hp: false,
  });
  const [input, setInput] = useState({
    id: "",
    pw: "",
    hp: "",
  });
  const [errMsg, setErrMsg] = useState({
    id: "",
    pw: "",
    hp: "",
  });
  const [pwHide, setPwHide] = useState(true);
  const onChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const onFocus = (event) => {
    setFocus({
      ...focus,
      [event.target.name]: true,
    });
  };

  const onBlur = (event) => {
    formCheck(event.target.name);
    setFocus({
      ...focus,
      [event.target.name]: false,
    });
  };
  return (
    <div className="RegisterForm">
      <form onSubmit={onSubmit} autoComplete="off">
        <div
          className={`input_item id ${focus.id ? "focus" : ""} ${
            input.id ? "on" : ""
          } ${errMsg.id ? "err" : ""}`}
        >
          <input
            type="text"
            name="id"
            id="register_id"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input.id}
          />
          <label htmlFor="register_id">아이디</label>
        </div>
        <div
          className={`input_item pw ${focus.pw ? "focus" : ""} ${
            input.pw ? "on" : ""
          } ${errMsg.pw ? "err" : ""}`}
        >
          <input
            type={pwHide ? "password" : "text"}
            name="pw"
            id="register_pw"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input.pw}
          />
          <label htmlFor="register_pw">비밀번호</label>
          <button
            type="button"
            className={`btn_view ${input.pw ? "" : "hide"}`}
            tabIndex={-1}
            onClick={() => {
              setPwHide(!pwHide);
            }}
          >
            <img src={`/${pwHide ? "close" : "open"}EyeIcon.png`} />
          </button>
        </div>
        <div
          className={`input_item hp ${focus.hp ? "focus" : ""} ${
            input.hp ? "on" : ""
          } ${errMsg.hp ? "err" : ""}`}
        >
          <input
            type="text"
            name="hp"
            id="register_hp"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input.hp}
          />
          <label htmlFor="register_hp">연락처{" (예 : 010-1234-5678)"}</label>
        </div>
        <div className={`error_message ${errMsg.id ? "" : "hide"}`}>
          {errMsg.id}
        </div>
        <div className={`error_message ${errMsg.pw ? "" : "hide"}`}>
          {errMsg.pw}
        </div>
        <div className={`error_message ${errMsg.hp ? "" : "hide"}`}>
          {errMsg.hp}
        </div>
        <button
          type="submit"
          className={`btn_login ${
            !input.id ||
            !input.pw ||
            !input.hp ||
            errMsg.id ||
            errMsg.pw ||
            errMsg.hp
              ? ""
              : "on"
          }`}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
