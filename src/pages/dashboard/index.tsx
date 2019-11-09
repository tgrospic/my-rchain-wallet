import React, { Component } from 'react';
import { Card, Typography, Tag, Button, Avatar } from 'antd';
import styles from './style.less';
import mixpanel from 'mixpanel-browser';

import { formatMessage } from 'umi-plugin-locale';
import Account from './components/Account';
import AccountDetail from './components/AccountDetail';
import Token from './components/Token';
import Transaction from './components/Transaction';
import { connect } from 'dva';
import { ConnectState, DispatchProps, UserModelState, WalletModelState } from '@/models/connect';

const { Text } = Typography;

export interface ITransaction {
  type: string;
  timestamp: number;
  title: string;
  number: number;
  status: string;
}

interface IAccountDetailProps extends DispatchProps {
  user: UserModelState;
  wallet: WalletModelState;
}

@connect(({ user, wallet }: ConnectState) => ({ user, wallet }))
export default class Dashboard extends Component<IAccountDetailProps> {
  state = {
    visible: false,
  };
  componentDidMount(): void {
    this.props.dispatch({
      type: 'wallet/checkBalance',
    });
  }

  close = () => {
    this.setState({
      visible: false,
    });
    mixpanel.track('关闭用户详情窗口');
  };
  open = () => {
    this.setState({
      visible: true,
    });
    mixpanel.track('打开用户详情窗口');
  };

  render() {
    const { user, dispatch, wallet } = this.props;
    const { visible } = this.state;
    const { currentUser } = user;
    const { revBalance } = wallet;
    const tokenList = [
      { name: 'RChain', img: 'http://pics.arvinx.com/2019-11-05-150211.jpg' },
      { name: 'ETH', img: 'http://pics.arvinx.com/2019-11-05-150237.jpg' },
    ];
    const transaction: ITransaction[] = [
      {
        timestamp: new Date().valueOf(),
        type: 'send',
        title: 'Contract Interaction',
        number: 125,
        status: '',
      },
      {
        type: 'receive',
        timestamp: new Date().valueOf(),
        title: 'Receive',
        number: 125,
        status: 'checked',
      },
      {
        type: 'receive',
        timestamp: new Date().valueOf(),
        title: 'Receive',
        number: 125,
        status: 'checked',
      },
      {
        type: 'receive',
        timestamp: new Date().valueOf(),
        title: 'Receive',
        number: 125,
        status: 'checked',
      },
      {
        type: 'receive',
        timestamp: new Date().valueOf(),
        title: 'Receive',
        number: 423,
        status: 'checked',
      },
      {
        type: 'send',
        timestamp: new Date().valueOf(),
        title: 'Contract Interaction',
        number: 125,
        status: 'checked',
      },
      {
        type: 'send',
        timestamp: new Date().valueOf(),
        title: 'Contract',
        number: 100,
        status: 'checked',
      },
      {
        type: 'send',
        timestamp: new Date().valueOf(),
        title: 'Contract',
        number: 79.3,
        status: 'checked',
      },
    ];
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Account open={this.open} currentUser={currentUser} balance={revBalance} />
          <AccountDetail
            dispatch={dispatch}
            close={this.close}
            currentUser={currentUser}
            visible={visible}
          />
          <Token tokenList={tokenList} selectedToken={'RChain'} />
        </div>
        <div className={styles.right}>
          <Transaction transaction={transaction} token={'REV'} />
        </div>
      </div>
    );
  }
}
