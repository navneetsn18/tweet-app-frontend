import React from 'react';
import Home from './home';
import { pages } from '../constants/strings';
import MyTweets from './my-tweets';
import AllUsers from './all-users';
import ResetPassword from './reset-password';

export default function Root(props) {
  let component = null;
  switch (props.selectedPage) {
    case pages.HOME: {
      component = <Home />;
      break;
    }
    case pages.MY_TWEETS: {
      component = <MyTweets />;
      break;
    }
    case pages.ALL_USERS: {
      component = <AllUsers />;
      break;
    }
    case pages.RESET_PASSWORD: {
      component = <ResetPassword />;
      break;
    }
    default:
      component = <Home />;
  }
  return (
    <div
      className={'w-100'}
      style={{ transition: '0.5s',marginTop: 60  }}>
      <div className={'container-fluid p-0 mx-0 h-100 w-100'}>
        <div className={'row h-100 mx-0'}>
          <div className={'col-12 h-100 p-0'}>
            {component}
          </div>
        </div>
      </div>
    </div>
  );
}
