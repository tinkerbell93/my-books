import React, { useContext } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import PersonContext from '../context/PersonContext';

// state = {
//     count: 0
// }

// this.setState({count: this.state.count + 1});

export default function Counter() {
  const [state, setState] = React.useState({ count: 0 });
  const width = useWindowWidth();
  const ref = React.useRef();

  const context = useContext(PersonContext);

  // componentDidMount
  //   React.useEffect(() => {
  //     console.log('Counter componentDidMount');
  //     return () => {
  //       console.log('Counter componentWillUnmount');
  //     };
  //   }, []);

  //   React.useEffect(() => {
  //     console.log('Counter state 가 변경된 후 실행 1');
  //     return () => {
  //       // cleanup
  //       console.log('Counter state 가 변경되기 전 실행 2');
  //     };
  //   }, [state, name]);

  //   React.useEffect(() => {
  //     console.log('Counter state 가 변경된 후 실행 1');
  //     return () => {
  //       // cleanup
  //       console.log('Counter state 가 변경되기 전 실행 2');
  //     };
  //   }, [name]);

  //   React.useEffect(() => {
  //     setState({ count: state.count + 1 });
  //   }, [state]);

  const click = React.useCallback(() => {
    console.log('+');
    setState({ count: state.count + 1 });
  }, [state]);

  return (
    <div>
      <h1 ref={ref}>
        {state.count} {width}
      </h1>
      <button onClick={click}>+</button>
      <p>{JSON.stringify(context)}</p>
    </div>
  );

  // useMemo
  // useCallback
}
