import styled from "styled-components";
import {sizes} from "../../data/ProductDetailData";

const SizeInput = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1); /* 어두운 테두리 색상 */
  background-color: rgb(255, 255, 255);
  width: 70px;
  height: 50px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    font-weight: 550;
  }
`;

const SizeButton = ({ size, checked, onClick }) => (
  <SizeInput type="button" value={sizes.value} checked={checked} onClick={onClick}>
    {size.label}
  </SizeInput>
);

export default SizeButton;