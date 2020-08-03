import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(Component) {
  const displayName = `withAuth(${Component.displayName})`;
  const C = (props) => {
    const token = localStorage.getItem('token');

    //  만약에 hasToken이 false이면 이 hoc를 사용한 컴포넌트 토큰이 있으면 리다이렉트
    if (token !== null) {
      return <Redirect to="/" />;
    }

    return <Component {...props} />;
  };

  C.displayName = displayName;

  return C;
}
