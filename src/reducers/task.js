const initialState = [
  {
    name: 'Name of Task #1',
    date: 'Fri Sep 13 2019',
    time: '12:40',
    description: 'Description of Task',
    countPomidoro: 1
  },
  {
    name: 'Name of Task #1',
    date: 'Fri Sep 13 2019',
    time: '12:40',
    description: 'Description of Task',
    countPomidoro: 1
  }
]


export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POMIDORO':
      const copyState = [...state];
      copyState[action.index] = { ...copyState[action.index], countPomidoro: action.payload };
      console.log(state);
      console.log(copyState);
      return copyState;

    case 'ADD_TASK':
      return [...state, action.payload];

    default:
      return state
  }
}