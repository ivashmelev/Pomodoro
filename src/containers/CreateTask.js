import React, { Component } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import history from '../helpers/history'
import { connect } from 'react-redux'
import { addTask } from '../actions/taskAction'
import { response } from '../helpers/responsive'


class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: 1,
      inputValues: [],
      task: {}
    }
  }

  componentDidMount() {
    const inputs = document.querySelectorAll('input, textarea, #calendar');
    inputs.forEach(element => this.state.currentInput !== Number(element.dataset.order) ? element.style.display = "none" : element.style.display = "block");
  }

  saveValue(e) {
    const copyState = { ...this.state };
    const inputs = document.querySelectorAll('input, textarea, #calendar');
    const nextInput = (inputs) => {
      inputs.forEach(element => copyState.currentInput !== Number(element.dataset.order) ? element.style.display = "none" : element.style.display = "block");
    }
    const saveCalendar = (date) => {
      const [weekDay, month, day, year] = date.toString().split(' ');
      copyState.inputValues[1] = { weekDay, month, day, year };
      this.setState({ currentInput: ++copyState.currentInput });
      nextInput(inputs);

      this.setState((state, props) => copyState);

      console.log(this.state);
    }

    if (copyState.currentInput === 2) {
      saveCalendar(e);
    }

    if (window.innerHeight < 1000) {
      if (e.keyCode === 13) {

        if (copyState.currentInput !== 4) {
          copyState.inputValues.push(e.target.value);
          this.setState({ currentInput: ++copyState.currentInput });
          nextInput(inputs);

          if (copyState.currentInput <= 2) {
            inputs[copyState.currentInput - 1].focus();
          }
        } else {
          this.setState({ currentInput: ++copyState.currentInput });
          copyState.inputValues.push(e.target.value);
          [
            copyState.task.name,
            copyState.task.date,
            copyState.task.time,
            copyState.task.description
          ] = [...copyState.inputValues];

          const { weekDay, month, day, year } = { ...copyState.task.date };
          copyState.task.date = `${weekDay} ${month} ${day} ${year}`;
          copyState.task.countPomidoro = 0;

          this.props.addTask(copyState.task);
          nextInput(inputs);

        }



        console.log(copyState);

        this.setState((state, props) => copyState);
      }
    } else {
      if (e.keyCode === 13 && e.ctrlKey) {

        if (copyState.currentInput !== 4) {
          copyState.inputValues.push(e.target.value);
          this.setState({ currentInput: ++copyState.currentInput });
          nextInput(inputs);

          if (copyState.currentInput <= 2) {
            inputs[copyState.currentInput - 1].focus();
          }
        } else {
          this.setState({ currentInput: ++copyState.currentInput });
          copyState.inputValues.push(e.target.value);
          [
            copyState.task.name,
            copyState.task.date,
            copyState.task.time,
            copyState.task.description
          ] = [...copyState.inputValues];

          const { weekDay, month, day, year } = { ...copyState.task.date };
          copyState.task.date = `${weekDay} ${month} ${day} ${year}`;
          copyState.task.countPomidoro = 0;

          this.props.addTask(copyState.task);
          nextInput(inputs);

        }



        console.log(copyState);

        this.setState((state, props) => copyState);
      }
    }

  }

  render() {
    const { currentInput, inputValues } = this.state;
    console.log(inputValues);
    return (
      <CreateTaskWrapper>
        <CreateTaskBlock>
          {currentInput <= 1 ?
            <CreateTaskInputWrapper>
              <CreateTaskInput data-order="1" placeholder="Name of Task" onKeyDown={(e) => this.saveValue(e)} />
            </CreateTaskInputWrapper>
            :
            <CreateTaskText>{inputValues[0]}</CreateTaskText>
          }
          {currentInput <= 2 ?
            // <CreateTaskInput data-order="2" placeholder="Date" onKeyDown={(e) => this.saveValue(e)} />
            <CreateTaskCalendarWrapper id="calendar" data-order="2">
              <Calendar onClickDay={(e) => this.saveValue(e)} />
            </CreateTaskCalendarWrapper>
            :
            <CreateTaskText>{inputValues[1].weekDay} {inputValues[1].month} {inputValues[1].day} {inputValues[1].year}</CreateTaskText>
          }
          {currentInput <= 3 ?
            // <CreateTaskInput data-order="2" placeholder="Date" onKeyDown={(e) => this.saveValue(e)} />
            <CreateTaskInput data-order="3" placeholder="Time" onKeyDown={(e) => this.saveValue(e)} />
            :
            <CreateTaskText>{inputValues[2]}</CreateTaskText>
          }
          {currentInput <= 4 ?
            <CreateTaskRichBox data-order="4" placeholder="Description of Task" onKeyDown={(e) => this.saveValue(e)}></CreateTaskRichBox>
            :
            <CreateTaskText>{inputValues[3]}</CreateTaskText>
          }
          <CreateTaskNavigation>
            <CreateTaskLink onClick={() => history.push({ pathname: '/tasks' })}>Tasks</CreateTaskLink>
            {/* <CreateTaskLink>New Task</CreateTaskLink> */}
            <CreateTaskLink onClick={() => history.push({ pathname: '/about' })}>About</CreateTaskLink>
          </CreateTaskNavigation>
        </CreateTaskBlock>
      </CreateTaskWrapper>
    )
  }
}

const mapStateToProps = store => ({

});

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);


const CreateTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media ${response.tablet} {
    padding: 20px;
  }
`;

const CreateTaskBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 600px;
  width: 100%;
  
`;

const CreateTaskInputWrapper = styled.div`
  max-width: 450px;
  width: 100%;

  @keyframes move-help {
    from {
      left: 550px;
      opacity: 0;
    }

    90%{
      left: 490px;
    }

    to {
      left: 460px;
      opacity: 1;
    }
  }

  :before{
    content: 'Ctrl + Enter';
    display: block;
    font-size: 8px;
    letter-spacing: -0.5px;
    background-color: #18A0FB;
    padding: 3px;
    box-sizing: border-box;
    color: white;
    width: 50px;
    font-family: Roboto;
    text-align: center;
    border-radius: 5px;
    clip-path: polygon(15% 0%,100% 1%,100% 100%,15% 100%,0% 50%);
    top: 54px;
    position: relative;
    left: 460px;
    opacity: 0;
    animation-delay: 3s;
    animation-duration: 1s;
    animation-name: move-help;
    animation-fill-mode: forwards;
  }

  @media (max-width: 1000px) {
    :before{
      display: none;
    }
  }
`;

const CreateTaskInput = styled.input`
  max-width: 450px;
  width: 100%;
  height: 55px;
  font-family: Roboto;
  font-size: 20px;
  padding: 5px 20px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #c2c1c196;
  border-radius: 5px;
  margin: 20px 0;
  transition: .5s cubic-bezier(0.165, 0.84, 0.44, 1);

  :focus{
    border: 3px solid #18A0FB;
  }
`;

const CreateTaskCalendarWrapper = styled.div`
  :before{
    font-family: Roboto;
    font-size: 20px;
    position: relative;
    top: -10px;
    left: 0px;
    display: block;
  }

  :nth-child(2):before{
    content: 'Date';
  }
`;

const CreateTaskText = styled.p`
  font-family: Roboto Bold;
  font-size: 16px;
  width: 75%;
  margin: 30px;

  :before{
    font-size: 12px;
    position: relative;
    font-family: Roboto;
    top: -10px;
    left: 0px;
    display: block;
    letter-spacing: 1.5px;
  }

  :after{

  }

  :nth-child(1):before{
    content: 'Name of Task';
  }

  :nth-child(2):before{
    content: 'Date';
  }

  :nth-child(3):before{
    content: 'Time';
  }

  :nth-child(4):before{
    content: 'Description of Task';
  }
`;

const CreateTaskRichBox = styled.textarea`
/*border-active: rgb(169, 169, 169); */
  max-width: 450px;
  width: 100%;
  height: 300px;
  font-size: 18px;
  outline: none;
  font-family: Roboto;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #c2c1c196;
  resize: none;
  margin: 20px;
  border-radius: 5px;
  transition: .5s cubic-bezier(0.165, 0.84, 0.44, 1);

  :focus{
    border: 2px solid #18A0FB;
  }
`;

const CreateTaskNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CreateTaskLink = styled.a`
  display: flex;
  justify-content: space-between;
  margin: 50px 20px;
  box-sizing: border-box;
  font-family: Roboto Bold;
  letter-spacing: 2px;
  font-size: 18px;
  text-decoration: none;

  :hover{
    cursor: pointer;
  }
`;