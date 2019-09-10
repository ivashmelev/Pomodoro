import React, { Component } from 'react'
import styled from 'styled-components'
import history from '../helpers/history'
import AboutImg from '../assets/img/about.svg'

export default class About extends Component {
  render() {
    return (
      <AboutWrapper>
        <AboutInfo src={AboutImg} />
        <AboutBack onClick={() => history.push({ pathname: '/' })}>Назад</AboutBack>
      </AboutWrapper>
    )
  }
}


const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
`;

const AboutInfo = styled.img`
  width: 600px;
`;

const AboutBack = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 50px 20px;
  box-sizing: border-box;
  font-family: Roboto Bold;
  letter-spacing: 2px;
  font-size: 18px;

  :hover{
    cursor: pointer;
  }
`;