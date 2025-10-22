import "../style/MyInfo.css";
import { useState, useEffect } from "react";
const MyInfo = ({ userInfo, onUpdate, onDelete, onLogOut }) => {
  const [editMode, setEditMode] = useState(false);
  const [pwHide, setPwHide] = useState(false);
  const [input, setInput] = useState({
    pw : "",
    hp : ""
  });
  useEffect(() => {
      initInput();
    }, [userInfo]);

  const initInput = ()=>{
      setInput({
          pw: "",
          hp: userInfo.hp,
      });
  }


  const [focus, setFocus] = useState({
    pw: false,
    hp: false,
  });
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
    //formCheck(event.target.name);
    setFocus({
      ...focus,
      [event.target.name]: false,
    });
  };
  return (
    <div className="MyInfo">
        <div className="menu-title">
          <h3>회원 정보</h3>
        </div>
      <div className="MyInfo-contents">
        <table className="info">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <span>{userInfo.id}</span>
              </td>
            </tr>
            {editMode ? (
              <>
                <tr>
                  <th>연락처</th>
                  <td>
                      <input
                          type="text"
                          name="hp"
                          onChange={onChangeInput}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          value={input.hp}
                      />
                  </td>
                </tr>
                <tr>
                  <th>새 비밀번호</th>
                  <td>
                    <input
                      type={pwHide ? "password" : "text"}
                      name="pw"
                      onChange={onChangeInput}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      value={input.pw}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <th>연락처</th>
                <td>
                  <span>{userInfo.hp}</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="v_btn">
          {editMode ? (
            <div className="DeleteAccount-btn">
              <button  onClick={onDelete}>회원 탈퇴</button>
              <div className="h_btn">
                <button
                  onClick={async () => {
                    try {
                        await onUpdate(input.pw, input.hp);
                        setEditMode(false);
                    }catch(error) {
                        alert(error.response.data);
                        initInput();
                    }
                  }}
                >
                  확인
                </button>
                <button onClick={() => setEditMode(false)}>취소</button>
              </div>
            </div>
          ) : (
            <div className="UserMenu-btn">
              <button onClick={onLogOut}>로그아웃</button>
              <button onClick={() => setEditMode(true)}>정보수정</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
