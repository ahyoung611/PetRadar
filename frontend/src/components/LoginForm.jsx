import { useState } from "react";
import "../style/LoginForm.css";
const LoginForm = ({ isExist, onLogin }) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!input.id) {
      setErrMsg("아이디를 입력해주세요.");
      return;
    }
    if (!await isExist(input.id)) {
      setErrMsg("없는 회원입니다.");
      return;
    }

    if (!input.pw) {
      setErrMsg("비밀번호를 입력해주세요.");
      return;
    }
    if(!await onLogin(input.id, input.pw)){
        setErrMsg(
            "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요."
        );
        return;
    }
  };
  const [focus, setFocus] = useState({
    id: false,
    pw: false,
  });
  const [input, setInput] = useState({
    id: "",
    pw: "",
  });
  const [pwHide, setPwHide] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const onChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const onDeleteInput = (name) => {
    setInput({
      ...input,
      [name]: "",
    });
  };
  const onFocus = (event) => {
    setFocus({
      ...focus,
      [event.target.name]: true,
    });
  };
  const onBlur = (event) => {
    setFocus({
      ...focus,
      [event.target.name]: false,
    });
  };

  return (
    <div className="LoginForm">
      <form onSubmit={onSubmit} autoComplete="off">
        <div
          className={`input_item id ${focus.id ? "focus" : ""} ${
            input.id ? "on" : ""
          }`}
        >
          <input
            type="text"
            name="id"
            id="login_id"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input.id}
          />
          <label htmlFor="login_id">아이디</label>
          <div className="loginIcon-box">
            <button
              type="button"
              tabIndex={-1}
              className={`btn_delete ${input.id ? "" : "hide"}`}
              onClick={() => {
                onDeleteInput("id");
              }}
            >
              <img src="/deleteIcon.png" />
            </button>
          </div>
        </div>
        <div
          className={`input_item pw ${focus.pw ? "focus" : ""} ${
            input.pw ? "on" : ""
          }`}
        >
          <input
            type={pwHide ? "password" : "text"}
            name="pw"
            id="user_pw"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={input.pw}
          />
          <label htmlFor="user_pw">비밀번호</label>
          <div className="loginIcon-box">
            {/* view button */}
            <button
              type="button"
              tabIndex={-1}
              className={`btn_view ${input.pw ? "" : "hide"}`}
              onClick={() => {
                setPwHide(!pwHide);
              }}
            >
              <img src={`/${pwHide ? "close" : "open"}EyeIcon.png`} />
            </button>
            {/* delete button */}
            <button
              type="button"
              tabIndex={-1}
              className={`btn_delete ${input.pw ? "" : "hide"}`}
              onClick={() => {
                onDeleteInput("pw");
              }}
            >
              <img src="/deleteIcon.png" />
            </button>
          </div>
        </div>
        <div className={`error_message ${errMsg ? "" : "hide"}`}>{errMsg}</div>
        <button
          type="submit"
          className={`btn_login ${input.id && input.pw ? "on" : ""}`}
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
