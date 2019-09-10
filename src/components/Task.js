import React, { Component } from 'react'
import styled from 'styled-components'
import PomidoroImg from '../assets/img/tomato.svg'
import PomidoroTimerStartImg from '../assets/img/play-button.svg'
import PomidoroTimerPauseImg from '../assets/img/pause.svg'
import EditButtonImg from '../assets/img/edit.svg'
import CheckedImg from '../assets/img/check-mark.svg'
import Calendar from 'react-calendar'
import EditOkImg from '../assets/img/diploma.svg'


export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusTimer: 'pause',
      minut: 25,
      second: 0,
      timer: '',
      checked: false,
      edit: false,
      editDate: false
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
    }

    const timer = setInterval(handlerTimer, 1000)

    copyState.timer = timer;
    console.log(copyState);
    this.setState((state, props) => copyState);

  }

  stopTimer() {
    const copyState = { ...this.state };
    copyState.statusTimer = 'pause';
    clearInterval(copyState.timer);
    this.setState((state, props) => copyState);
  }

  checkedTask(e) {
    const copyState = { ...this.state };
    copyState.checked = !copyState.checked;
    this.setState((state, props) => copyState);
    const card = e.target.parentElement.parentElement;
    setTimeout(() => {
      card.style.opacity = 0;
      setTimeout(() => {
        this.props.deleteTask(this.props.index);
        card.style.opacity = 1;
        copyState.checked = !copyState.checked;
        this.setState((state, props) => copyState);
      }, 2500);
    }, 2000);
  }

  editTask(e) {
    const copyState = { ...this.state }
    const card = e.target.parentElement.parentElement;
    const inputs = card.querySelectorAll('.react-calendar, input, textarea');
    const task = {};
    if (!copyState.editDate) {
      task.date = this.props.date;
    } else {
      const [weekDay, month, day, year] = copyState.editDate.toString().split(' ');
      task.date = `${weekDay} ${month} ${day} ${year}`;
    }

    task.name = inputs[1].value;
    task.time = inputs[2].value;
    task.description = inputs[3].value;
    task.countPomidoro = 0;

    this.props.editTask(this.props.index, task);
    copyState.edit = false;
    this.setState((state, props) => copyState);
  }

  render() {
    const { name, date, time, description, countPomidoro } = this.props;
    const { statusTimer, minut, second, checked, edit, editDay } = this.state;
    const [weekDay, month, day, year] = date.toString().split(' ');
    return (
      <div>
        {edit ?
          <TaskEditWrapper>
            <TaskEditForm>
              <Calendar value={new Date(date)} onClickDay={(e) => this.setState({ editDate: e })} />
              <TaskInput placeholder="Name of Task" defaultValue={name} />
              <TaskInput placeholder="Time" defaultValue={time} />
              <TaskRichBox placeholder="Description of Task" defaultValue={description}></TaskRichBox>
            </TaskEditForm>
            <TaskEditOkWrapper>
              <TaskEditOk src={EditOkImg} onClick={(e) => this.editTask(e)} />
            </TaskEditOkWrapper>
          </TaskEditWrapper>
          :
          <TaskWrapper>
            <TaskHeaderWrapper>
              <TaskCheckedWrapper onClick={(e) => this.checkedTask(e)}>
                {checked ?
                  <TaskCheckedImg src={CheckedImg} />
                  : null
                }
              </TaskCheckedWrapper>
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
                :
                <TaskEditButtonWrapper>
                  <TaskEditButton onClick={() => this.setState({ edit: !edit })} src={EditButtonImg} />
                </TaskEditButtonWrapper>
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
                    <TaskPomidoroTimerImg src={PomidoroTimerPauseImg} onClick={() => this.stopTimer()} /> : null
                }
              </TaskPomidoroTimerWrapper>
            </TaskFooterWrapper>
          </TaskWrapper >
        }
      </div>
    )
  }
}


const TaskWrapper = styled.div`
  max-width: 287.84px;
  width: 100%;
  min-height: 400px;
  box-shadow: 1px 2px 3px 2px rgba(0,0,0,0.25);
  padding: 40px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px;
  opacity: 1;
  transition: opacity 3s cubic-bezier(0.075, 0.82, 0.165, 1);

  :hover{
    cursor: pointer;
  }
  
`;

const TaskEditWrapper = styled.div`
  max-width: 310.84px;
  width: 100%;
  min-height: 400px;
  box-shadow: 1px 2px 3px 2px rgba(0,0,0,0.25);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px;
  opacity: 1;
  transition: opacity 2.5s cubic-bezier(0.075,0.82,0.165,1);
`

const TaskEditForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskEditOkWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const TaskEditOk = styled.img`
  width: 40px;

  :hover{
    cursor: pointer;
  }
`;

const TaskInput = styled.input`
  height: 35px;
  margin-top: 20px;
  padding: 5px 10px;
  font-family: Roboto Bold;
  outline: none;
  border-radius: 5px;
  border: 1px solid #c2c1c196;
  box-sizing: border-box;
  letter-spacing: 1.2px;

`;

const TaskRichBox = styled.textarea`
  resize: none;
  height: 150px;
  margin-top: 20px;
  padding: 5px 10px;
  font-family: Roboto Bold;
  outline: none;
  border-radius: 5px;
  border: 1px solid #c2c1c196;
  box-sizing: border-box;
  letter-spacing: 1.2px;
`;

const TaskHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskCheckedWrapper = styled.div`
  width: 33px;
  border: 1.5px solid;
  border-radius: 5px;
  height: 33px;
`;

const TaskCheckedImg = styled.img`
  width: 30px;
  height: 30px;
  transform: scale(2);
  position: relative;
  top: -10px;
  left: 10px;
`;


const TaskEditButtonWrapper = styled.div`
  height: 0;
  position: relative;
  top: -60px;
  left: 180px;
`;

const TaskEditButton = styled.img`
  width: 33px;
  height: 33px;
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