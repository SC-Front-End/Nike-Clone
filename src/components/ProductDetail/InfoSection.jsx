import React from 'react';
import styled from 'styled-components';

const Details = styled.details`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
`;

const Summary = styled.summary`
  outline: none;
  user-select: none;
  list-style: none;
  padding: 28px 0px;
`;

const MoreInfoP = styled.p``;

const InfoSection = ({ info, isOpen, toggleOpen }) => (
    <Details onClick={toggleOpen}>
      <Summary>{info.title}</Summary>
      <MoreInfoP>{info.content}</MoreInfoP>
    </Details>
  );

  export default InfoSection;