import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
`;

const ViewDiary = ({ date, data, onClose }) => {
  if (!data) return null;

  return (
    <Overlay>
      <FormBox>
        <h3>{date} 일기</h3>
        <p><strong>제목:</strong> {data.title}</p>
        <p><strong>내용:</strong><br />{data.content}</p>
        {data.image && (
          <img
            src={data.image}
            alt="첨부 이미지"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <button onClick={onClose} style={{ marginTop: "20px" }}>
          닫기
        </button>
      </FormBox>
    </Overlay>
  );
};

export default ViewDiary;
