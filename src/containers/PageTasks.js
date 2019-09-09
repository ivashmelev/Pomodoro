import React, { Component } from 'react'
import history from '../helpers/history'
import styled from 'styled-components'
import Task from '../components/Task'
import { connect } from 'react-redux'
import { setPomidoro } from '../actions/timerAction'


class PageTasks extends Component {
  render() {
    const { tasks, setPomidoroAction } = this.props;
    return (
      <PageTasksWrapper>
        {tasks.map((task, index) =>
          <Task
            key={index}
            index={index}
            name={task.name}
            date={task.date}
            time={task.time}
            description={task.description}
            countPomidoro={task.countPomidoro}
            setPomidoro={setPomidoroAction}
          />
        )}
        <PageTaskNavigation>
          <PageTaskLink onClick={() => history.push({ pathname: '/' })}>New Task</PageTaskLink>
          <PageTaskLink>About</PageTaskLink>
        </PageTaskNavigation>
      </PageTasksWrapper>
    )
  }
}

const mapStateToProps = store => ({
  tasks: store.task
});

const mapDispatchToProps = dispatch => ({
  setPomidoroAction: (index, count) => dispatch(setPomidoro(index, count))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTasks);

const PageTasksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
  flex-direction: column;
`;

const PageTaskNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const PageTaskLink = styled.a`
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
