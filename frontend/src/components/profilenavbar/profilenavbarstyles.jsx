import styled from "styled-components";

export const ProfileNavbarStyled = styled.div`
  background-color: white;
  padding: 25px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProfileLeftNavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
`;

export const ProfileRightNavbarStyled = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 0 25px;
`;

export const BorderedButton = styled.div`
  border: 1.5px solid #094067;
  border-radius: 10px;
  color: #094067;
  height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilledButton = styled.div`
  background-color: #094067;
  color: #fffffe;
  border-radius: 10px;
  height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
