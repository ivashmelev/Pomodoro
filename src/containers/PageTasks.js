import React, { Component } from 'react'
import styled from 'styled-components'
import Task from '../components/Task'

export default class PageTasks extends Component {
  render() {
    return (
      <PageTasksWrapper>
        <Task />
      </PageTasksWrapper>
    )
  }
}


const PageTasksWrapper = styled.div`

`;
