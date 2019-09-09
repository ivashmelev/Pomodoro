import React, { Component } from 'react'
import history from '../helpers/history'
import styled from 'styled-components'
import Task from '../components/Task'
import { connect } from 'react-redux'

class PageTasks extends Component {
  render() {
    const { tasks } = this.props;
    console.log(tasks);
    return (
      <PageTasksWrapper>
        {tasks.map((task, index) =>
          <Task
            key={index}
            name={task.name}
            date={task.date}
            time={task.time}
            description={task.description}
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
  tasks: store.task.task
});

export default connect(mapStateToProps)(PageTasks);

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
