import React, { useEffect, useState } from 'react';
import { ZIMKitManager, Common, ZIMKitChatListVM, ZIMKitConversationType } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';

const id = Math.floor(Math.random()*1000)

export default function ChatRoom() {




  const { user } = useContext(UserContext);
  const { trainerId } = useParams();

  const [state, setState] = useState({
    appConfig: {
      appID: 1131425668,
      serverSecret: 'ca03c7a0ca109548eb207f0b389c0bb1',
    },
    userInfo: {
      userID: user ? user.userid : '',
      userName: user ? user.name : '',
      userAvatarUrl: '',
    },
  });

  useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };
    init();
  }, []);

  /* Displays user's information */
  return (
    <div>Welcome back {state.userInfo.userID}
      <Common></Common>
    </div>
  );
}
