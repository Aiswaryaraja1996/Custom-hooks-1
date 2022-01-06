import { useReducer } from "react";

const actions = {
  INCREMENT_COUNTER: "INCREMENT_COUNTER",
  DECREMENT_COUNTER: "DECREMENT_COUNTER"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.INCREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1
      };
    }
    case actions.DECREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter - 1
      };
    }
    default:
      return state;
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleChange = (type) => {
    dispatch({
      type
    });
  };

  return (
    <div>
      <h2>Counter</h2>
      <h2>{state.counter}</h2>
      <button onClick={() => handleChange(actions.INCREMENT_COUNTER)}>
        ADD
      </button>
      <button onClick={() => handleChange(actions.DECREMENT_COUNTER)}>
        REDUCE
      </button>
    </div>
  );
}

export default Counter;
