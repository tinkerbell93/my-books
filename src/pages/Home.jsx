import React from 'react';
import withAuth from '../hocs/withAuth';

function Home() {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}
export default withAuth(Home, true);
