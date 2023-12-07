import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import nikeLogo from './img/nike-logo.png';

const MainMenu = styled.nav`
    display: flex;
    flex-flow: row wrap;
    background: #fff;
    width: 100%; 
    height: 70px;


    .MainNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .nike_logo {
        margin-left: 140px; 
    }

    .MenuList {
        flex-grow: 1;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }
    
    ul {
        display: flex;
        justify-content: center;
        list-style: none; 
        margin: 0;
        padding: 0;
    }

    li {
        margin-left: 20px;
        margin-right: 40px;
        margin-bottom: 10px;
    }

    .UserMenu {
        margin-right: 20px;
        margin-bottom: 10px;

    }

    input{
        margin-right: 15px;
        visibility: visible;
        background: #f5f5f5;
        color: inherit;
        cursor: text;
        
    }

    .search{
        background-color: #fff;
        border-radius: 30px;
        height: 20px;
        margin-right: 25px;
    }

    span{
        margin-right: 10px;
        font-size: 14px;
        font-weight: bold;
    }

    a {
        display: inline-block;
        position: relative;
    }

    a:after {
        content:"";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 4px;
        background-color: #000;
        transition: all .5s;
    }
    a:before {
        content:"";
        position: absolute;
        right: 50%;
        bottom: 0;
        width: 0;
        height: 4px;
        background-color: #000;
        transition: all .5s;
    }
    a:hover:after {
        width: 50%
    }
    a:hover:before {
        width: 50%
    }

`;

const Modal = styled.div`
    position: absolute;
    top: 90px;  
    left: 0;
    margin-left: 1080px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 13px;
    z-index: 2;
    height: 18px;
    font-size: 12px;
    font-weight: bold;
`;
// eslint-disable-next-line
const variableWithoutDeclaration = 42;

const Nav = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [relatedSearches, setRelatedSearches] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

    //모달 영역 외 클릭했을 때 모달 닫기 
    const handleDocumentClick = (e) => {
        if (!e.target.closest('.Modal') && isModalVisible) {
            setModalVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);

    const handleSearchInputChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);

        if (newQuery.trim() === '') {
            // 검색어 비어져 있으면 모달 숨기기
            setModalVisible(false);
        } else {
            // 검색어가 있으면 모달 보이도록 함
            const relatedSearchesList = [
                `${newQuery} 신발`,
                `${newQuery} 할인`,
                `${newQuery} 스타일링`,
            ];
            setRelatedSearches(relatedSearchesList);
            setModalVisible(true);
        }
    }

    const handleSearchSubmit = (e) => {
        console.log('검색어: ', searchQuery);
        // 서버 요청 등 검색 처리 로직 추가

        // 새로고침 방지
        e.preventDefault();
    }


    return (
        <MainMenu>
            <div className="MainNav">
                <div className="nike_logo">
                    <img src={nikeLogo} alt="Logo" />
                </div>
                <div className="MenuList">
                    <ul>
                        <li><a>New Releases</a></li>
                        <li><a>Men</a></li>
                        <li><a>Women</a></li>
                        <li><a>Kids</a></li>
                        <li><a>Sale</a></li>
                        <li><a>SNKRS</a></li>
                        <li><a>연말을 위한 선물</a></li>
                    </ul>
                </div>

                <div className="UserMenu">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            className="search"
                            type="text"
                            placeholder="검색"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {isModalVisible && (
                            <Modal className="SearchModal">
                                <ul>
                                    {relatedSearches.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </Modal>
                        )}
                    </form>
                </div>
            </div>
        </MainMenu>
    );
};

export default Nav;