let initialState;

if (localStorage['state']) {
  initialState = JSON.parse(localStorage['state']);
} else {
  initialState = [];
}

// const initialState = [
//   {
//     name: 'Name of Task #1',
//     date: 'Fri Sep 13 2019',
//     time: '12:40',
//     description: 'Description of Task',
//     countPomidoro: 1
//   },
//   {
//     name: 'Name of Task #1',
//     date: 'Fri Sep 13 2019',
//     time: '12:40',
//     description: 'Description of Task',
//     countPomidoro: 1
//   }
// ]


export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POMIDORO': {
      const copyState = [...state];
      copyState[action.index] = { ...copyState[action.index], countPomidoro: action.payload };
      localStorage['state'] = JSON.stringify(copyState);
      return copyState;
    }

    case 'ADD_TASK': {
      const copyState = [...state, action.payload];
      localStorage['state'] = JSON.stringify(copyState);
      return copyState
    }

    case 'DELETE_TASK': {
      const copyState = [...state];
      copyState.splice(action.payload, 1);
      localStorage['state'] = JSON.stringify(copyState);
      return copyState;
    }

    case 'EDIT_TASK': {
      const copyState = [...state];
      copyState[action.index] = action.payload;
      localStorage['state'] = JSON.stringify(copyState);
      return copyState;
    }


    default:
      return state
  }
}