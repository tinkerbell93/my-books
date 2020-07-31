import React from 'react';
import axios from 'axios';
import { message } from 'antd';
import withAuth from '../hocs/withAuth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import '../css/Signin.scss';

class Signin extends React.Component {
  state = {
    email: '',
  };
  passwordRef = React.createRef(null); //한번 만들어지면 그대로
  render() {
    return (
      <div className={'signin-wrapper'}>
        <h1>로그인</h1>
        <div className={'layout'}>
          <div className={'left'}>
            {/* <img src="../img/signin.jpg" alt="sigin" /> */}
            <div className={'input-img'}></div>
          </div>
          <div className={'right'}>
            <h2>Welcome</h2>
            <p>Enjoy My Books App</p>
            <label>
              <UserOutlined />
              <input
                type="text"
                value={this.state.email}
                onChange={this.change}
                placeholder="이메일 입력"
              />
            </label>
            <label>
              <LockOutlined />
              <input
                type="password"
                ref={this.passwordRef}
                placeholder="비밀번호 입력"
              />
            </label>
            <button onClick={this.click}>Sing in</button>
          </div>
        </div>
      </div>
    );
  }

  click = async () => {
    // const passwordDom = document.querySelector('#password');
    console.log('login', this.state.email, this.passwordRef.current.value);

    const email = this.state.email;
    const password = this.passwordRef.current.value;

    // 클라이언트에서 유효성 검사를 한다.
    if (email === '' || password === '') return;

    try {
      const response = await axios.post('https://api.marktube.tv/v1/me', {
        email,
        password,
      });

      // 1. 토큰을 저장한다.
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);

      // 2. 홈으로 이동시킨다.
      this.props.history.push('/');
    } catch (error) {
      const errorCode = error?.response?.data?.error || 'NOT_MATCH';
      if (errorCode === 'PASSWORD_NOT_MATCH') {
        message.error('비밀번호 땡!');
      } else if (errorCode === 'USER_NOT_EXIST') {
        message.error('가입한 적 없는 이메일 입니다!');
      } else {
        message.error('나도 모르는 에러');
      }

      // 실패
    }
  };

  change = (e) => {
    // console.log(e.target.value);
    this.setState({ email: e.target.value });
  };
}

export default withAuth(Signin, false);
