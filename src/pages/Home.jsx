import React from 'react';
import withAuth from '../hocs/withAuth';
import Counter from '../Components/Counter';

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Counter />
    </div>
  );
}
export default withAuth(Home, true);
