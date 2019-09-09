import { combineReducers } from 'redux'
import { taskReducer } from './task'

export const rootReducer = combineReducers({
  task: taskReducer
});