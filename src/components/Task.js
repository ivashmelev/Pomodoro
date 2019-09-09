import React, { Component } from 'react'
import styled from 'styled-components'
import PomidoroImg from '../assets/img/tomato.svg'
import PomidoroTimerStartImg from '../assets/img/play-button.svg'
import PomidoroTimerPauseImg from '../assets/img/pause.svg'


export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTimer: 'pause',
      minut: 25,
      second: 0,
    }
  }

  startTimer() {
    const copyState = { ...this.state };
    copyState.statusTimer = 'play';
    let rest = true;
    let cickle = 0;

    const handlerTimer = () => {
      if (copyState.second === 0) {
        copyState.second = 60;
        copyState.minut -= 1;
      }

      if (copyState.minut === 0 && copyState.second === 1 && !rest) {
        copyState.minut = 25;
        copyState.second = 0;
        rest = true;
        cickle += 1;
      }

      if (copyState.minut === 0 && copyState.second === 1 && rest) {
        rest = false;
        copyState.minut = 5;
        copyState.second = 0;
        console.log('Pomidorko!');
        console.log(this.props.index, 'index');
        this.props.setPomidoro(this.props.index, this.props.countPomidoro + 1);
      }

      if (cickle === 4) {
        copyState.minut = 15;
        copyState.second = 0;
        cickle = 0;
        rest = false;
        console.log('Big rest!');
      }

      copyState.second -= 1;


      this.setState((state, props) => copyState);


      const stopTimer = () => {
        clearInterval(timer);
      }
    }

    const timer = setInterval(handlerTimer, 1000)
  }



  render() {
    const { name, date, time, description, countPomidoro } = this.props;
    const { statusTimer, minut, second } = this.state;
    const [weekDay, month, day, year] = date.toString().split(' ');
    return (
      <TaskWrapper>
        <TaskHeaderWrapper>
          <TaskDateWrapper>
            <TaskDateDay>
              {day}
            </TaskDateDay>
            <TaskDateMonthYearWrapper>
              <TaskDateMonth>{month.toUpperCase()}</TaskDateMonth>
              <TaskDateYear>{year}</TaskDateYear>
            </TaskDateMonthYearWrapper>
          </TaskDateWrapper>
          <TaskWeekDay>{weekDay}</TaskWeekDay>
        </TaskHeaderWrapper>
        <TaskMiddleWrapper>
          {statusTimer === 'play' ?
            <TaskTimerWrapper>
              <TaskTimer>{String(minut).length === 1 ? `0${minut}` : minut} : {String(second).length === 1 ? `0${second}` : second}</TaskTimer>
            </TaskTimerWrapper>
            : null
          }
          <TaskNameTimeWrapper>
            <TaskName>{name}</TaskName>
            <TaskTime>{time}</TaskTime>
          </TaskNameTimeWrapper>
          <TaskDescriptionWrapper>
            <TaskDescriptionTitle>Description</TaskDescriptionTitle>
            <TaskDescription>{description}</TaskDescription>
          </TaskDescriptionWrapper>
        </TaskMiddleWrapper>
        <TaskFooterWrapper>
          <TaskPomidoroImgNumberWrapper>
            <TaskPomidoroImg src={PomidoroImg} />
            <TaskPomidoroNumber> x {countPomidoro}</TaskPomidoroNumber>
          </TaskPomidoroImgNumberWrapper>
          <TaskPomidoroTimerWrapper>
            {statusTimer === 'pause' ?
              <TaskPomidoroTimerImg src={PomidoroTimerStartImg} onClick={() => this.startTimer()} /> :
              statusTimer === 'play' ?
                <TaskPomidoroTimerImg src={PomidoroTimerPauseImg} onClick={() => this.setState({ statusTimer: 'pause' })} /> : null
            }
          </TaskPomidoroTimerWrapper>
        </TaskFooterWrapper>
      </TaskWrapper >
    )
  }
}


const TaskWrapper = styled.div`
  max-width: 287.84px;
  width: 100%;
  height: 400px;
  box-shadow: 1px 2px 3px 2px rgba(0,0,0,0.25);
  padding: 40px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px;

  :hover{
    cursor: pointer;
  }
  
`;
const TaskHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TaskDateWrapper = styled.div`
  display: flex;
`;
const TaskDateDay = styled.p`
  margin: 0;
  font-size: 40px;
  line-height: 34px;
  font-family: Roboto Bold;
`;

const TaskDateMonthYearWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TaskDateMonth = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 19px;
  font-family: Roboto Bold;
  letter-spacing: 2.3px;
`;
const TaskDateYear = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 16px;
  font-family: Roboto;
`;
const TaskWeekDay = styled.p`
  margin: 0;
  font-size: 24px;
  line-height: 16px;
  font-family: Roboto Bold;
  display: flex;
  align-items: center;
`;
const TaskMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const TaskNameTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskName = styled.p`
  margin: 0;
  font-size: 16px;
  font-family: Roboto Bold;
`;
const TaskTime = styled.p`
  margin: 0;
  font-size: 16px;
  font-family: Roboto Bold;
`;

const TaskDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
const TaskDescriptionTitle = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 14px;
  opacity: 0.7;
  font-family: Roboto Bold;
`;
const TaskDescription = styled.p`
  font-size: 12px;
  line-height: 14px;
  font-family: Roboto Bold;
`;
const TaskFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskPomidoroImgNumberWrapper = styled.div`
  display: flex;
`;

const TaskPomidoroImg = styled.img``;

const TaskPomidoroNumber = styled.p`
  margin: 0;
  font-size: 19px;
  font-family: Roboto Bold;
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 33px;
`;

const TaskPomidoroTimerWrapper = styled.div`
  width: 33px;
`;

const TaskPomidoroTimerImg = styled.img`
  width: 33px;
`;

const TaskTimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  top: -60px;
  height: 0px;
  position: relative;
`;

const TaskTimer = styled.div`
  font-size: 40px;
  line-height: 34px;
  font-family: Roboto Bold;
  position: relative;
`;