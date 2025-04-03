import React, { useEffect, useState } from 'react'

const User = {
  ID: 'test2323@@@',
  pw: 'test2323@@@'
}


export default function Login() {
    const [ID, setID] = useState('');
    const [pw, setPw] = useState('');

    const [IDValid, setIDValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
      if(IDValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [IDValid, pwValid]);

    const handleID = (e) => {
      setID(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setIDValid(true);
      } else {
        setIDValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };
    const onClickConfirmButton = () => {
      if(ID === User.ID && pw === User.pw) {
        alert('로그인에 성공했습니다.')
      } else {
        alert("등록되지 않은 회원입니다.");
      }
    }
    const onClickConfirmButton22 = () => {   
        alert('회원가입창으로 이동합니다.');
        
      }

    return (
      <div className="page">
        <div className="titleWrap">
          LOGIN
        </div>

        <div className="contentWrap">
          <div className="inputTitle">아이디</div>
          <div
            className="inputWrap"
          >
            <input
              className="input"
              type="text"
              placeholder="test2323@@@"
              value={ID}
              onChange={handleID}
            />
          </div>
          <div className="errorMessageWrap">
            {!IDValid && ID.length > 0 && (
              <div>올바른 아이디를 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        <div>
          <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
            확인
          </button>
        </div>
        
        <div>
          <button onClick={onClickConfirmButton22} disabled={notAllow} className="bottomButton22">
            회원가입
          </button>
        </div>
      </div>
      
    );
}