import React, { useState } from "react";
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
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  font-weight: bold;
  background-color: ${({ cancel }) => (cancel ? "#999" : "#333")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const DiaryForm = ({ date, initial = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(initial.title || "");
  const [content, setContent] = useState(initial.content || "");
  const [image, setImage] = useState(initial.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(date, { title, content, image });
  };

  return (
    <Overlay>
      <FormBox>
        <h3>{date} 일기 작성</h3>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          rows="5"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img
            src={image}
            alt="첨부 이미지"
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <ButtonGroup>
          <Button onClick={handleSubmit}>완료</Button>
          <Button cancel onClick={onCancel}>취소</Button>
        </ButtonGroup>
      </FormBox>
    </Overlay>
  );
};

export default DiaryForm;
