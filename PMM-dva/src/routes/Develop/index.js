import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Spin, Drawer, Button, Icon, message, notification, Modal, Input } from 'antd';
import myContract from '../../utils/myContract';
import { selectDesc } from '../../utils/contractConfig';
import copy from 'copy-to-clipboard';
import styles from './index.less';

class Develop extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	best: 1000,
	  	betState: false,
	  	betLoading: false,
	  	betLoadingText: '',
	  	userByContractArr: ['可用余额','冻结余额','充值总额','提现总额','邀请码','被邀请码','今日导师祝福奖励','状态','总静态收益','总团队收益','总导师祝福收益','总导师收益'],
      	userByContract: {},
      	selectItemName: {
			1: styles.item1,
			2: styles.item2,
			3: styles.item3
		},
	  };

	  this.getIC = this.getIC.bind(this);
	  this.handleBet = this.handleBet.bind(this);
	}

	componentDidMount() {
		this.myContract = myContract('https://kovan.infura.io');
		if(window.getUserInfo(this.props.app).address == "") {
			this.props.dispatch(routerRedux.push('/indexPage'))
		}
		this.getSelectDesc();
	}

	upUserInfo = () => {
	    this.setState({
	      betLoadingText: window.langConfig[window.Lang]['同步用户信息中...'],
	      betLoading: true,
	    })
	    //获取用户信息
	    this.myContract.getUserInfo().then(({ address, banlance }) => {
	      if(!address) return;
	      //获取用户在合约上的信息
	      this.myContract.getContractUserInfo(address)
	      .then(res => {
	        let userByContract = {};
	        this.state.userByContractArr.map((v, i) => {
	          if(i == 4 || i == 5 || i == 7){
	            userByContract[v] = res[i];  
	          }else{
	            userByContract[v] = this.myContract.fromWei(res[i]);
	          }
	        })
	        console.log('格式化合约信息', userByContract)
	        this.props.dispatch({
	          type: 'app/saveUserInfo',
	          payload: {
	            address,
	            banlance,
	            userByContract,
	          }
	        })
	        this.setState({
	          betLoading: false,
	          betLoadingText: '',
	        });
	      })
	    })
	}

	async getIC() {
	    const { userByContract, address, beInvitedCode } = window.getUserInfo(this.props.app);

	    if(userByContract['邀请码']) {
	    	return userByContract['邀请码'];
	    }

		let inviteCode = await this.props.dispatch({
	      type: 'develop/inviteCode',
	      payload: {
	        coverInvitatonCode: userByContract['被邀请码'] || beInvitedCode,
	        walletAddress: address
	      }
	    })
		console.log(inviteCode)
	    return inviteCode;
	}

	async handleBet() {
		console.log('投注')
	    const { betState, betValue, best } = this.state;
	    const { userByContract, address, banlance, beInvitedCode } = window.getUserInfo(this.props.app);
	    if(userByContract['状态'] == 1){
	    	this.showModal('yxz');
	      	return;
	    }
	    if(!betState){
	      message.error(window.langConfig[window.Lang]['请输入1~25之间的整数']);
	      return;
	    }
	    if(betValue/best > banlance){
	      this.showModal('yebz');
	      return;
	    }
	    
	    this.setState({
	        betLoading: true,
	        betLoadingText: window.langConfig[window.Lang]['投注中...'],
	    })

	    let inviteCode = await this.getIC();

	    this.myContract.bet(address, betValue/best, inviteCode, userByContract['被邀请码'] || beInvitedCode)
	    .then(transactionHash => {
	      this.setState({
	        betLoadingText: window.langConfig[window.Lang]['正在查询投注状态...'],
	      })
	      console.log('handleBet', transactionHash)
	      return this.myContract.getTransactionReceipt(transactionHash);
	    })
	    .then(receipt => {
	      this.upUserInfo();
	      receipt.status ? 
	        this.showModal('tzcg', receipt) 
	        : 
	        notification.error({
	          message: window.langConfig[window.Lang]['交易失败'],
	          description: window.langConfig[window.Lang]['研发室交易失败正文'],
	        })
	    }).catch(err => {
	      this.setState({
	        betLoading: false,
	      })
	      console.log(err)
	    })
	}

	handleAgainBet = () => {
		console.log('再次投注')
	    const { betState, betValue, best } = this.state;
	    const { userByContract, address, banlance } = window.getUserInfo(this.props.app);
	    if(userByContract['状态'] == 1){
	    	this.showModal('yxz');
	      	return;
	    }
	    if(!betState){
	      message.error(window.langConfig[window.Lang]['请输入1~25之间的整数']);
	      return;
	    }
	    this.setState({
	        betLoading: true,
	        betLoadingText: window.langConfig[window.Lang]['投注中...'],
	    })
	    this.myContract.againBet(address, betValue)
	    .then(transactionHash => {
	      this.setState({
	        betLoadingText: window.langConfig[window.Lang]['正在查询投注状态...'],
	      })
	      return this.myContract.getTransactionReceipt(transactionHash);
	    })
	    .then(receipt => {
	      this.upUserInfo();
	      receipt.status ? 
	        this.showModal('tzcg', receipt)
	        : 
	        notification.error({
	          message: window.langConfig[window.Lang]['交易失败'],
	          description: '',
	        })
	    }).catch(err => {
	      this.setState({
	        betLoading: false,
	      })
	      console.log(err)
	    })
	}

	getLv = (userByContract) => {
	    const { best } = this.state;
	    let lockCoin = userByContract["冻结余额"]*best;
	    let level = 0;
	    if(lockCoin >= 1 && lockCoin <= 5){
	      level = 1;
	    }else if(lockCoin >= 6 && lockCoin <= 10){
	      level = 2;
	    }else if(lockCoin >= 11 && lockCoin <= 15){
	      level = 3;
	    }else if(lockCoin >= 16){
	      level = 'MAX';
	    }
	    return level;
	}

	handleClipBoard = (userByContract) => {
	    if(copy(`https://www.boq.hk/#/?beInvitedCode=${userByContract["邀请码"]}`)){
	      notification.success({
	        message: window.langConfig[window.Lang]['复制成功'],
	        description: '',
	      }) 
	    }else{
	      notification.success({
	        message: window.langConfig[window.Lang]['复制失败，请重试'],
	        description: '',
	      }) 
	    }
	}

	toLink = (url) => {
	    this.props.dispatch(routerRedux.push(url))
	}

	min = () => {
		const { best } = this.state;
		const { banlance } = window.getUserInfo(this.props.app);
		if(banlance*best < 1){
			return;
		}
		this.setState({
			betValue: 1,
			betState: true,
		})
	}

	max = (maxnum) => {
		const { best } = this.state;
		const { banlance } = window.getUserInfo(this.props.app);
		let max = maxnum || 25;
	    if(banlance*best < max){
	      max = parseInt(banlance*best);
	    }
		this.setState({
			betValue: max,
			betState: true,
		})
	}

	handleKeyup = (e) => {
		const { banlance } = window.getUserInfo(this.props.app);
	    const { best } = this.state;
	    const value = e.target ? Number(e.target.value) : Number(e);
	    let betValue, betState;

	    if(value == 0) {
	    	betValue = "";
	    	betState = false;
	    }else if(Number.isInteger(value) && value > 0) {
	    	betValue = banlance*best >= value ? (value > 25 ? 25 : value) : parseInt(banlance*best);
	    	betState = true;
	    }else{
			message.error(window.langConfig[window.Lang]['请输入1~25之间的整数']);
			betValue = this.state.betValue;
	    	betState = false;
	    }

	    let selectKey = 0;
	    Object.keys(selectDesc).map((k, i) => {
	    	if(selectDesc[k].max >= betValue && selectDesc[k].min <= betValue) {
	    		selectKey = k;
	    	}else if(i == Object.keys(selectDesc).length-1 && selectDesc[k].max < betValue) {
	    		selectKey = Object.keys(selectDesc).length;
	    	}
	    })

	    this.setState({
	    	betValue,
	    	betState,
			selectKey,
		},() => {
			this.getSelectDesc();
		})
	}

	getDrawBalance = () => {
		const { address } = window.getUserInfo(this.props.app);
	    this.setState({
	        betLoading: true,
	        betLoadingText: window.langConfig[window.Lang]['提取中...'],
	    })
	    this.myContract.drawBalance(address)
	    .then(transactionHash => {
	      this.setState({
	        betLoadingText: window.langConfig[window.Lang]['正在查询提取状态...'],
	      })
	      return this.myContract.getTransactionReceipt(transactionHash);
	    })
	    .then(receipt => {
	      this.upUserInfo();
	      receipt.status ? 
	        notification.success({
	          message: window.langConfig[window.Lang]['提取成功'],
	          description: '',
	        }) 
	        : 
	        notification.error({
	          message: window.langConfig[window.Lang]['提取失败'],
	          description: '',
	        })
	    })
	    .catch(err => {
	      this.setState({
	        betLoading: false,
	      })
	      console.log(err)
	    })
	}

	showModal = (modalType, receipt) => {
		const { betValue, best } = this.state;
		let modalBoxBg = '';

	    if(modalType == 'ether') {
	    	modalBoxBg = styles.walletModalBg;
	    }else if(modalType == 'invitation') {
	        modalBoxBg = styles.walletModalBg;
	    }else if(modalType == 'yebz'){
		    modalBoxBg = styles.warningModalBg;
	    }else if(modalType == 'yxz'){
		    modalBoxBg = styles.warningModalBg;
	    }else if(modalType == 'zcqr'){
		    modalBoxBg = styles.warningModalBg;
	    }else if(modalType == 'zjbz'){
		    modalBoxBg = styles.warningModalBg;
	    }else if(modalType == 'tzcg'){
			this.props.dispatch({
		      type: 'develop/receipt',
		      payload: {
		        transactionHash: receipt.transactionHash,
		        transactionAmount: betValue / best,
		        walletAddress: receipt.from
		      }
		    })

		    modalBoxBg = styles.warningModalBg;
	    }

	    this.setState({
	      	modalBoxBg,
			modalType,
	      	modalVisible: true,
	      	moveVisible: false,
	    });
	};

	hideModal = () => {
	    this.setState({
	      modalVisible: false,
	    });
	};

	getModalRender = () => {
	    const { betValue, best, modalType } = this.state;
		const { userByContract, banlance } = window.getUserInfo(this.props.app);
	    let other = {};
	    if(modalType == 'ether') {
	      other = {
	        modalTitle: (
	          <div>
	            { window.langConfig[window.Lang]['钱包'] }
	            {userByContract['可用余额'] > 0 && <div className={styles.btn} onClick={ this.getDrawBalance }>{ window.langConfig[window.Lang]['提取'] }</div>}
	          </div>
	        ),
	        modalDesc: (
	          <div className={styles.walletModal}>
	            <div className={styles.ethBox}>
	              <ul>
	                <li className={styles.icon}></li>
	                <li className={styles.num}>{ banlance }</li>
	                <li className={styles.txt}>{ window.langConfig[window.Lang]['当前拥有的星痕能量'] }（ETH）</li>
	              </ul>
	            </div>
	            <div className={styles.contractInfo}>
					<div className={styles.item} style={{borderLeft: '0.12rem solid #52f8fe'}}>
						{ window.langConfig[window.Lang]['冻结中'] }：{ userByContract['冻结余额'] }
					</div>
					<div className={styles.item} style={{borderLeft: '0.12rem solid #9635c8'}}>
						{ window.langConfig[window.Lang]['可提现'] }：{ userByContract['可用余额'] }
					</div>
					<div className={styles.item} style={{borderLeft: '0.12rem solid #5ce37c'}}>
						{ window.langConfig[window.Lang]['已提现'] }：{ userByContract['提现总额'] }
					</div>
					<div className={styles.item} style={{borderLeft: '0.12rem solid #c8aa35'}}>
						{ window.langConfig[window.Lang]['总充值'] }：{ userByContract['充值总额'] }
					</div>
	            </div>
	            <div className={styles.desc}>
					<p className={styles.lineClamp}>{ window.langConfig[window.Lang]['星痕水晶是一种晶体物质，可以存储和释放能量，由于战舰上资源有限，个人所拥有的的星痕水晶成为了研究新型引擎所需能源的重要来源，单个星痕水晶可以存储的能量大小至今仍未探明。'] }</p>
					<p style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['【注:1星痕能量=1ETH】'] }</p>
	            </div>
	          </div>
	        ),
	      };
	    }else if(modalType == 'invitation') {
	      other = {
	        modalTitle: window.langConfig[window.Lang]['邀请'],
	        modalDesc: (
	          <div className={styles.invitationModal}>
	            <div className={styles.topBox}>
					<ul>
						<li className={styles.icon}></li>
						{ 
							userByContract['邀请码'] ?
							<Fragment>
								<li className={styles.num}>{ userByContract['邀请码'] }</li>
								<li className={styles.txt}>{ window.langConfig[window.Lang]['邀请链接'] }</li>
							</Fragment>
							:
							<li className={styles.none}>{ window.langConfig[window.Lang]['请先注入能量获取邀请码'] }</li>
						}
					</ul>
				</div>
				<div className={styles.desc}>
					<p><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['以现在星痕水晶所提供的能量，远远无法满足您所倾向的引擎的研发需求，不如试试发展更多的支持者吧！'] }</p>
					<p style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['【注:邀请码包含在链接里】'] }</p>
				</div>
	            {
	            	userByContract['邀请码'] ?
	            	<div className={styles.copy} onClick={ () => this.handleClipBoard(userByContract) }><span className={styles.gradientText}>{ window.langConfig[window.Lang]['复制并分享'] }</span></div>
	            	:
	            	<div className={`${styles.copy} ${styles.gray}`}><span className={styles.gradientText}>{ window.langConfig[window.Lang]['复制并分享'] }</span></div>
	            }
	          </div>
	        ),
	      };
	    }else if(modalType == 'yebz'){
	    	other = {
		        modalTitle: window.langConfig[window.Lang]['警告'],
		        modalDesc: (
		          <div className={styles.yebzModal}>
		        	<div className={styles.icon}></div>
		            <div className={styles.desc}>
		              <p style={{textAlign: 'center'}}><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['您正在向'] }<span style={{color: '#00ffff'}}>{ window.langConfig[window.Lang]['曲率驱动引擎项目'] }</span>{ window.langConfig[window.Lang]['发起能量注入的申请,注入值为'] }：</p>
		              <p style={{textAlign: 'center'}}><span className={styles.num}>{ betValue / best }</span>ETH</p>
		              <p>{ window.langConfig[window.Lang]['您的能量余额为'] }<span style={{color: '#f9dd6e'}}>{ banlance }</span>，{ window.langConfig[window.Lang]['不满足您申请注入能量的最低值'] }</p>
		            </div>
		          </div>
		        ),
		    };
	    }else if(modalType == 'yxz'){
	    	other = {
		        modalTitle: window.langConfig[window.Lang]['警告'],
		        modalDesc: (
		          <div className={styles.yebzModal}>
		        	<div className={styles.icon}></div>
		            <div className={styles.desc}>
		              <p style={{textAlign: 'center'}}><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['您正在向'] }<span style={{color: '#00ffff'}}>{ window.langConfig[window.Lang]['曲率驱动引擎项目'] }</span>{ window.langConfig[window.Lang]['发起能量注入的申请，此次申请失败。'] }</p>
		              <p>{ window.langConfig[window.Lang]['原因是您已经有正在支持的项目，为了舰上资源的合理利用，请不要在同一时间段向多个项目注入星痕能量。请在您当前支持的项目研发周期结束后再来申请吧！'] }</p>
		            </div>
		          </div>
		        ),
		    };
	    }else if(modalType == 'zcqr'){
	    	let d = {};
	    	Object.keys(selectDesc).map(k => {
				if(betValue >= selectDesc[k].min &&  betValue >= selectDesc[k].max) {
					d = {
						...selectDesc[k],
					}
				}
			});
	    	other = {
		        modalTitle: window.langConfig[window.Lang]['提醒'],
		        modalDesc: (
		          <div className={styles.zcqrModal}>
		        	<div className={styles.icon}></div>
		            <div className={styles.desc}>
		              <p style={{textAlign: 'center'}}><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['您正在向'] }<span style={{color: '#00ffff'}}>{ window.langConfig[window.Lang]['曲率驱动引擎项目'] }</span>{ window.langConfig[window.Lang]['发起能量注入的申请,注入值为'] }：</p>
		              <p style={{textAlign: 'center'}}><span className={styles.num}>{ betValue }</span>ETH</p>
		              <p>{ window.langConfig[window.Lang]['注入后，项目研发周期结束前无法退出，本次注入的能量将于'] }<span style={{color: '#f9dd6e'}}>{ d.day }</span>{ window.langConfig[window.Lang]['日后返还，确定注入吗？'] }</p>
		            </div>
		            <div className={styles.but} onClick={ userByContract['可用余额'] > betValue/best ? this.handleAgainBet : this.handleBet }><span className={styles.gradientText}>{ window.langConfig[window.Lang]['确认注入'] }</span></div>
		          </div>
		        ),
		    };
	    }else if(modalType == 'zjbz'){
	    	other = {
		        modalTitle: window.langConfig[window.Lang]['提醒'],
		        modalDesc: (
		          <div className={styles.zcqrModal}>
		        	<div className={styles.icon}></div>
		            <div className={styles.desc}>
		              <p style={{textAlign: 'center'}}><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['您的能量不足，无法直接向跃迁引擎项目注入星痕能量。'] }</p>
		            </div>
		          </div>
		        ),
		    };
	    }else if(modalType == 'tzcg'){
	    	let d = {};
	    	Object.keys(selectDesc).map(k => {
				if(betValue >= selectDesc[k].min &&  betValue >= selectDesc[k].max) {
					d = {
						...selectDesc[k],
					}
				}
			});
	    	other = {
		        modalTitle: window.langConfig[window.Lang]['提醒'],
		        modalDesc: (
		          <div className={styles.tzcgModal}>
		        	<div className={styles.icon}></div>
		            <div className={styles.desc}>
		              <p style={{textAlign: 'center'}}><span style={{color: '#f9dd6e'}}>{ window.langConfig[window.Lang]['士官长'] }</span>{ window.langConfig[window.Lang]['您已成功向'] }<span style={{color: '#00ffff'}}>{ window.langConfig[window.Lang]['曲率驱动引擎项目'] }</span>{ window.langConfig[window.Lang]['注入能量,注入值为'] }：</p>
		              <p style={{textAlign: 'center'}}><span className={styles.num}>{ betValue }</span>ETH</p>
		              <p>{ window.langConfig[window.Lang]['项目周期为'] }<span style={{color: '#f9dd6e'}}>{ d.day }</span>{ window.langConfig[window.Lang]['天，日收益为'] }<span style={{color: '#f9dd6e'}}>{ d.profit }</span>{ window.langConfig[window.Lang]['该项目结束前，您不能再次向其他项目注入能量。'] }</p>
		            </div>
		          </div>
		        ),
		    };
	    }
	    return (
	      <div className={styles.modalWrap}>
	        <div className={styles.inner}>
	          <div className={styles.title}>
	            { other.modalTitle }
	          </div>
	          <div className={styles.cont}>
	            { other.modalDesc }
	          </div>
	        </div>
	        <div className={styles.close} onClick={ this.hideModal }></div>
	      </div>
	    );
	}

	getSelectDesc = () => {
		const { banlance } = window.getUserInfo(this.props.app);
		const { selectKey, best } = this.state;
		let desc = selectDesc[selectKey] ? 
			selectDesc[selectKey] 
			: 
			{
				min: 0,
				max: 0,
				profit: 0,
				day: 0
			};

		if(selectKey == null){
			Object.keys(selectDesc).map(k => {
				if(selectDesc[k].min/best <= banlance) {
					desc = {
						...selectDesc[k],
					}
				}
			})
			this.max(desc.max);
		}

		this.setState({
			selectInfo: (
				<div className={styles.selectInfo}>
					<dl>
						<dt>{ desc.min }-{ desc.max }</dt>
						<dd>ETH</dd>
					</dl>
					<dl>
						<dt>{ desc.profit }</dt>
						<dd>{ window.langConfig[window.Lang]['日收益'] }</dd>
					</dl>
					<dl>
						<dt>{ desc.day }</dt>
						<dd>{ window.langConfig[window.Lang]['天'] }</dd>
					</dl>
				</div>
			)
		});
	}

	checkItem = (selectKey) => {
		const { banlance } = window.getUserInfo(this.props.app);
		const { best } = this.state;

		if(selectDesc[selectKey].min/best > banlance) {
			this.showModal('zjbz')
		}else {
			this.max(selectDesc[selectKey].max);
		}

		this.setState({
			selectKey,
		},() => {
			this.getSelectDesc();
		})
	}

	getSelectClass = (selectKey) => {
		const { banlance } = window.getUserInfo(this.props.app);
		const { best } = this.state;

		let selectItemName = {
			1: styles.item1,
			2: styles.item2,
			3: styles.item3
		};

		let initOn = {};

		Object.keys(selectDesc).map(k => {
			if(selectDesc[k].min/best > banlance) {
				selectItemName[k] = `${selectItemName[k]} ${styles.lock}`;
			}else if(selectKey == null){
				initOn = {
					[k]: `${selectItemName[k]} ${styles.on}`
				}
			}
		})

		if(selectKey != null && selectDesc[selectKey] && selectDesc[selectKey].min/best <= banlance){
			selectItemName[selectKey] = `${selectItemName[selectKey]} ${styles.on}`;
		}

		return {
			...selectItemName,
			...initOn,
		};
	}

	getSelectItem = () => {
		const { selectKey } = this.state;
		const selectItemName = this.getSelectClass(selectKey);
		return (
			<Fragment>
				<div className={selectItemName[1]} onClick={ () => this.checkItem(1) }></div>
				<div className={selectItemName[2]} onClick={ () => this.checkItem(2) }></div>
				<div className={selectItemName[3]} onClick={ () => this.checkItem(3) }></div>
			</Fragment>
		);
	}

	render() {
		const { address, userByContract, banlance } = window.getUserInfo(this.props.app);
		const { betValue, best, modalBoxBg, selectInfo, betState } = this.state;
		return (
			<Spin wrapperClassName={`spinZindex ${this.state.betLoading ? `on` : ``}`} size="large" spinning={ this.state.betLoading } tip={ <div style={{fontSize: '0.38rem'}}>{ this.state.betLoadingText }</div> }>
				<div className={styles.wrap}>
					<div className={styles.top}>
						<Link to="/indexPage"><div className={styles.back}></div></Link>
						<div className={styles.txt}>{ window.langConfig[window.Lang]['研发室'] }</div>
						{/*<div className={styles.FAQ}><Link to="/faq" style={{color: '#f9dd6e'}}>FAQ</Link></div>*/}
					</div>
					<div className={styles.level}>LV.{ this.getLv(userByContract) }</div>
					{ selectInfo }
					<div className={styles.selectWrap}>
						{ this.getSelectItem() }
					</div>
					{
						userByContract['状态'] == 1 || banlance*best < 1 ? 
						<div className={styles.inputBox}>
							<div className={styles.min} style={{color: 'gray', cursor: 'default'}}>MIN</div>
							<Input disabled={true} className={styles.input} value={ betValue } onChange={ this.handleKeyup } placeholder="1~25" />
							<div className={styles.max} style={{color: 'gray', cursor: 'default'}}>MAX</div>
						</div>
						:
						<div className={styles.inputBox}>
							<div className={styles.min} onClick={ this.min }>MIN</div>
							<Input className={styles.input} value={ betValue } onChange={ this.handleKeyup } placeholder="1~25" />
							<div className={styles.max} onClick={ () => this.max() }>MAX</div>
						</div>
					}
					
					<div className={styles.bottom}>
			            <div className={styles.buttons}>
			              <div className={styles.recordIcon}>
			                <p className={styles.icon} onClick={ () => { this.toLink('/admin') }}></p>
			                <p className={styles.txt}>{ window.langConfig[window.Lang]['军衔'] }</p>
			              </div>
			              <ul>
			                <li className={`${styles.developIcon} ${userByContract['状态'] != 1 && banlance*best > 0 && betState ? null : styles.gray}`} onClick={ () => { userByContract['状态'] != 1 ? this.showModal('zcqr') : (banlance*best < 1 ? this.showModal('zjbz') : this.showModal('yxz'))} }><span className={styles.gradientText}>{ window.langConfig[window.Lang]['注入能量'] }</span></li>
			                <li className={styles.etherIcon} onClick={ () => this.showModal('ether') }></li>
			              </ul>
			              <div className={styles.invitationIcon}>
			                <p className={styles.icon} onClick={ () => this.showModal('invitation') }></p>
			                <p className={styles.txt}>{ window.langConfig[window.Lang]['邀请'] }</p>
			              </div>
			            </div>
			        </div>
				</div>
				<Modal
		          visible={this.state.modalVisible}
		          footer={null}
		          closable={false}
		          wrapClassName={`${styles.modalBox} ${modalBoxBg}`}
		          onCancel={this.hideModal}
		        >
		         { this.getModalRender() } 
		        </Modal>
	        </Spin>
		);
	}
}

export default connect(({ app, develop }) => ({ app, develop }))(Develop);