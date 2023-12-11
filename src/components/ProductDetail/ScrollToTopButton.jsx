import styled from "styled-components";
import { useState, useEffect } from "react";

const ScrollButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: ${(props) =>
    props.show
      ? "inline"
      : "none"}; /* showScrollButton 값에 따라 동적으로 설정 */
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  z-index: 999;

  &:hover {
    background-color: #333;
  }
`;

 // 페이지 상단으로 스크롤하는 함수
 const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  
  const ScrollToTopButton = () => {

    const [showScrollButton, setShowScrollButton] = useState(false);

  // 페이지가 로드되었을 때와 스크롤할 때 이벤트 리스너 등록
  useEffect(() => {
    const handleScroll = () => {
      // 페이지의 스크롤 위치를 확인해 버튼을 보이거나 숨김
      const scrollY = window.scrollY; /*현재 페이지 세로 스크롤 위치*/
      const threshold = 200;
      const shouldShow = scrollY > threshold;
      setShowScrollButton(shouldShow);
    };

    // 초기에 한 번 호출하여 초기 상태 설정
    handleScroll();

    // 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행


    return (
      <ScrollButton show={showScrollButton}  id="scroll-top-button" onClick={scrollToTop}>
        ▲
      </ScrollButton>
    );
  };
  
  export default ScrollToTopButton;

