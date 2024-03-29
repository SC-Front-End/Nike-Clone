import React from "react";
import EventPage from "./EventPage";
import GiftPage from "./GiftPage";
import Nav from "../MainPage/Nav";
import styled from "styled-components";
import Footer from "../MainPage/Footer";

const MainPageContainer = styled.div`
  height: 1700px;
  margin: 20px;
`;

const EventMainPage = () => {
  return (
    <>
      <Nav />
      <MainPageContainer>
        <EventPage />
        <GiftPage />
      </MainPageContainer>
      <Footer />
    </>
  );
};

export default EventMainPage;
