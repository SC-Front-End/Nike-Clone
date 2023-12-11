import { useEffect, useState } from "react";
import styled from "styled-components";
import { productData, sizes, infoSections } from "../../data/ProductDetailData";
import SizeButton from "./SizeInput";
import InfoSection from "./InfoSection";
import ScrollToTopButton from "./ScrollToTopButton";

// import page
import Nav from "../MainPage/Nav";
import NavFooter from "../MainPage/NavFooter";
import Footer from "../MainPage/Footer";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  max-width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  /* margin-top: 10px; */
  padding: 50px;
  display: flex;
  flex-direction: row; /* 세로에서 가로로 변경 */
  justify-content: flex-start; /* 왼쪽 정렬로 수정 */
  align-items: stretch; /* 세로 정렬을 늘려줌 */
  gap: 20px;
  margin-top: 50px;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ThumbnailListContainer = styled.div`
  flex: 0.6; /* 전체 가로/세로 영역의 60%를 차지하도록 설정 */
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  gap: 10px; /* 썸네일 간의 간격 설정 */
  height: 100%; /* 부모 컨테이너의 높이를 상속 */
  align-items: flex-end; /* 자식 수직 중앙 정렬을 위한 설정 */
  padding: 0px 25px;
`;

const ThumbnailImg = styled.img`
  width: 80px; /* 원하는 가로 크기 */
  height: 80px; /* 원하는 세로 크기 */
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 650px; /* 최대 가로 넓이 설정 */
  height: auto; /*세로 크기 자동 조절 details 누르면 이미지가 내려감. */
  margin-left: auto;
  margin-right: auto;
  /*height: 90vh;*/
  object-fit: cover;
  border-radius: 8px;
  top: 0; /* 부모 요소의 위쪽에 위치하도록 설정 */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 60px;
  max-width: 500px;
  margin: 30px;
`;

const ProductCategoryInfo = styled.h5`
  color: rgb(153, 46, 0);
  font-weight: 600;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const FieldsetImg = styled.fieldset`
  border: none; /* 검은색 선 스타일 제거 */
  margin-left: 0px;
`;

const MainThumbnailImg = styled.div`
  display: flex;
  gap: 8px;
`;

const FormContainer = styled.form``;

const SizeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SizeGuide = styled.a``;

const SizeFieldSpan = styled.span``;

const SizeFormContainer = styled.div`
  margin-top: 30px;
  margin-left: 6px;
  width: 100%; /* Set width to 100% */
  justify-content: space-between;
  display: flex;
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
`;

const ButtonLogin = styled.button`
  border: 1px solid #808080;
  background-color: black;
  width: 100%;
  height: 60px;
  color: white;
  font-size: 16px;
  border-radius: 20px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    font-weight: 550;
  }
`;

const ButtonWishList = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1); /* 어두운 테두리 색상 */
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 60px;
  font-size: 16px;
  border-radius: 20px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    font-weight: 550;
  }
`;

const DetailImgWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬로 변경 */
  width: 100%; /* 창의 가로 넓이를 100%로 설정 */
  transition: margin-top 0.3s ease-in-out;
  margin-top: ${({ isopen }) => (isopen ? "150px" : "0px")};
`;

const DetailImgContainer = styled.div`
  display: flex;
  flex-direction: column; /* 이미지를 세로로 나열하도록 설정 */
  gap: 10px;
  position: relative;
  width: 100%; /* 원하는 너비 설정 */
  height: auto; /* 원하는 높이 설정 또는 고정된 높이 사용 */
  justify-content: center; /* 자식 가로 중앙 정렬 */
  align-items: center; /* 자식 세로 중앙 정렬 */
  padding-left: 150px;
  padding-right: 150px;
  padding-bottom: 150px;
  padding-top: 0; /* 변경된 부분: margin-top을 0으로 고정 */
  box-sizing: border-box;
`;

const DetailImage = styled.img`
  width: 100%;
  max-width: 100%; /* 이미지가 컨테이너를 벗어나지않게 최대 너비 설정 */
  height: 100%;
  border-radius: 8px;
  max-width: 650px;
  max-height: 820px;
`;


const Product = ({ selectedProductId: propSelectedProductId }) => {


  // 폼 데이터를 관리하기 위한 상태 훅 사용
  const [selectedSize, setSelectedSize] = useState("");
  const [productId, setProductId] = useState("000001");
  const [selectedProductId, setSelectedProductId] = useState({
    productId: "000001",
    thumbnailIndex: 0,
    thumbnails: productData.find((p) => p.id === "000001")?.thumbnails || [],
  });
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  //   const thumbnailUrl = selectedProductId.thumbnails[thumbnailIndex];

  if (!selectedProductId) {
    // 상품이 존재하지 않으면 오류를 방지하기 위해 처리할 내용 추가
    console.error(
      `상품 ID ${selectedProductId.productId}에 해당하는 상품을 찾을 수 없습니다.`
    );
    return null;
  }
  /*.error(`상품 ID 체크중 ${selectedProductId.productId}`);*/

  // 폼 제출 처리
  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: 서버로 폼 데이터를 보내는 로직 추가
    console.log("상품 ID:", productId);
    console.log("productData", productData);


    // 폼 데이터를 서버로 보내는 로직을 추후 추가 해야할 부분
  };

  const handleClickThumbnail = (productId, thumbnailIndex) => {
    setSelectedProductId({
      productId,
      thumbnailIndex,
      thumbnails: selectedProductId?.thumbnails || [],
    });

    // 추가: 클릭한 썸네일의 인덱스 업데이트
    setThumbnailIndex(thumbnailIndex);
  };

  return (
    <>
      <Container>
        <ScrollToTopButton />
        <Nav />
        <NavFooter />

        <Wrapper>
          <ThumbnailListContainer>
            {productData
              .filter((product) => product.id === selectedProductId.productId)
              .map((product) =>
                product.thumbnails.map((thumbnailUrl, index) => (
                  <ThumbnailImg
                    key={`${selectedProductId.productId}-${index}`}
                    src={thumbnailUrl}
                    onClick={() =>
                      handleClickThumbnail(selectedProductId.productId, index)
                    }
                  />
                ))
              )}
          </ThumbnailListContainer>
          <ImgContainer>
            <Image src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8e612413-a0a2-4c16-884e-c1e9f3dfaed7/%EC%8A%A4%ED%8F%AC%EC%B8%A0%EC%9B%A8%EC%96%B4-%EC%BB%AC%EB%A0%89%EC%85%98-%EC%97%AC%EC%84%B1-%ED%95%98%EC%9D%B4-%ED%8C%8C%EC%9D%BC-%ED%94%8C%EB%A6%AC%EC%8A%A4-%ED%95%98%ED%94%84%EC%A7%91-%ED%83%91-pIOgPBLx.png" />
          </ImgContainer>
          <InfoContainer>
            <ProductCategoryInfo>멤버 전용 제품</ProductCategoryInfo>
            <Title>나이키 스포츠 웨어 컬렉션</Title>
            <Desc>여성 하이-파일 플리스 하프집 탑</Desc>
            <Price>155,500 원</Price>
            <ImageContainer>
              <FieldsetImg>
                <MainThumbnailImg>
                  <ThumbnailImg
                    src={productData[0].thumbnails[0]} // 0번째 인덱스의 썸네일 사용
                    onClick={() =>
                      handleClickThumbnail(productId, thumbnailIndex)
                    }
                  />
                  <ThumbnailImg
                    src={productData[1].thumbnails[0]} // 0번째 인덱스의 썸네일 사용
                    onClick={() =>
                      handleClickThumbnail(productId, thumbnailIndex)
                    }
                  />
                </MainThumbnailImg>
              </FieldsetImg>
            </ImageContainer>
            <FormContainer onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <SizeContainer>
                <SizeFieldSpan>사이즈 선택</SizeFieldSpan>
                <SizeGuide>사이즈 가이드</SizeGuide>
              </SizeContainer>
              <SizeFormContainer>
                {sizes.map((size) => (
                  <SizeButton
                    key={size.value}
                    size={size}
                    checked={selectedSize === size.value}
                    onClick={() => setSelectedSize(size.value)}
                  />
                ))}
              </SizeFormContainer>
              <ButtonContainer>
                <ButtonLogin type="submit">로그인 후 구매하기</ButtonLogin>
                <ButtonWishList>위시리스트 🤍</ButtonWishList>
              </ButtonContainer>
            </FormContainer>
            {infoSections.map((info) => (
              <InfoSection
                key={info.id}
                info={info}
                isOpen={isReviewOpen}
                toggleOpen={() => setIsReviewOpen(!isReviewOpen)}
              />
            ))}
          </InfoContainer>
        </Wrapper>
        <DetailImgWrapper isopen={isReviewOpen ? "true" : "false"}>
          <DetailImgContainer>
            {productData
              .find((p) => p.id === selectedProductId.productId)
              ?.thumbnails.map((thumbnailUrl, index) => (
                <DetailImage key={index} src={thumbnailUrl} />
              ))}
          </DetailImgContainer>
        </DetailImgWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Product;