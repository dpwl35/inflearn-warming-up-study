import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLinkTitle>
            <img
              src='https://static-assets.bamgrid.com/product/disneyplus/images/disney-plus-logo-white-update.f384bde4d5a7f1f455e2dc7d8d4348ae.png'
              alt='Disney Plus Logo'
            />
          </FooterLinkTitle>
          <FooterLinkContent>
            <FooterLink type='button'>디즈니+ 이용약관</FooterLink>
            <FooterLink type='button'>디즈니 이용 약관</FooterLink>
            <FooterLink type='button'>취소 및 환불 정책</FooterLink>
            <FooterLink type='button'>사업자 정보</FooterLink>
            <FooterLink type='button'>청소년 보호 정책</FooterLink>
            <FooterLink type='button'>개인정보 수집 및 이용</FooterLink>
            <FooterLink type='button'>
              개인정보의 제3자 제공 및 국외 이전
            </FooterLink>
            <FooterLink type='button'>개인정보 처리방침</FooterLink>
            <FooterLink type='button'>개인정보 처리방침 부속서</FooterLink>
            <FooterLink type='button'>관심 기반 광고</FooterLink>
            <FooterLink type='button'>고객센터</FooterLink>
            <FooterLink type='button'>지원되는 기기</FooterLink>
            <FooterLink type='button'>디즈니+ 소개</FooterLink>
          </FooterLinkContent>
          <Metadata>
            © 2024 Disney and its related entities. All Rights Reserved.
          </Metadata>
        </FooterLinkContainer>
      </FooterContent>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  border-top: 1px solid rgb(25, 25, 25);
  width: 100%;
  position: relative;
  z-index: 100;
  margin-top: 100px;
  background-color: #0e0b14;
  @media (max-width: 769px) {
    padding: 20px 20px;
    padding-bottom: 30px;
  }
`;

const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FooterLinkTitle = styled.h1`
  color: gray;
  font-size: 17px;
  text-align: center;
  img {
    width: 86px;
    height: auto;
    margin: 10px 0;
  }
`;

const FooterLinkContent = styled.div`
  display: flex;
  margin: 0px auto;
  -webkit-box-pack: center;
  justify-content: center;
  flex-flow: wrap;
`;

const FooterLink = styled.button`
  color: #f9f9f9;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.46;
  margin: 11px 5px 10px;
`;

const Metadata = styled.div`
  font-size: 13px;
  line-height: 1.46;
  color: #cacaca;
  text-align: center;
`;
