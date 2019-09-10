import React, { Component } from 'react'
import history from '../helpers/history'
import styled from 'styled-components'
import Task from '../components/Task'
import { connect } from 'react-redux'
import { setPomidoro } from '../actions/timerAction'
import { deleteTask } from '../actions/taskAction'
import { editTask } from '../actions/taskAction'


class PageTasks extends Component {
  render() {
    const { tasks, setPomidoro, deleteTask, editTask } = this.props;
    return (
      <PageTasksWrapper>
        <TaskWrapper>
          {tasks.map((task, index) =>
            <Task
              key={index}
              index={index}
              name={task.name}
              date={task.date}
              time={task.time}
              description={task.description}
              countPomidoro={task.countPomidoro}
              setPomidoro={setPomidoro}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          )}
        </TaskWrapper>
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
  setPomidoro: (index, count) => dispatch(setPomidoro(index, count)),
  deleteTask: index => dispatch(deleteTask(index)),
  editTask: (index, task) => dispatch(editTask(index, task))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTasks);

const PageTasksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
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
