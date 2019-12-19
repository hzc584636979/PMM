import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './progress.less';
import Logo from '../assets/progress_logo.png';
import bg from '../assets/progress_bg.png';
import { getUrlOptions } from '../utils/utils';

class Progress extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	progressPCT: 0,
	  	toPageState: false,
	  	txt: window.langConfig[window.Lang]['加载中...'],
	  };
	}

	componentDidMount() {
		this.progressFunc(this.getRandom(500, 50));
		document.body.style.background = `url(${bg}) center center no-repeat`;
    	document.body.style.backgroundSize = '100% 100%';
	}

	componentWillUnmount() {
		document.body.style.background = '';
  	}

  	getRandom = (m, n) => {
  		return Math.floor(Math.random()*(m-n+1)+n);
  	}

  	progressFunc = (dely) => {
  		clearTimeout(this.pg);
  		let { progressPCT } = this.state;
  		let random = this.getRandom(15, 5);
  		random = 80 - random > 0 ? random : 80 - random;
		this.pg = setTimeout(() => {
			if(progressPCT < 80){
				let value = progressPCT+random;
				this.setState({
					progressPCT: value
				})
				this.progressFunc(this.getRandom(500, 50));
			}else{
				clearTimeout(this.pg);
				this.setState({
					progressPCT: 100,
					toPageState: true,
					txt: window.langConfig[window.Lang]['加载完成'],
				})
			}
		}, dely)
  	}

	render() {
		const beInvitedCode = getUrlOptions(this.props.location.search).beInvitedCode;
		return (
			<div className={styles.wrap}>
				<div className={styles.title}>
					<img src={Logo} />
				</div>
				<div className={styles.context}>
					<div className={styles.t}>
						<span className={styles.txt}>{ window.langConfig[window.Lang]['事件'] }</span> 
						{this.state.toPageState && 
							<Link className={styles.toPage} to={`/indexPage${beInvitedCode ? `?beInvitedCode=${beInvitedCode}` : ``}`}>{ window.langConfig[window.Lang]['跳过'] }</Link>
						}
					</div>
					<div className={styles.desc}>
						<Scrollbars>
							{ window.langConfig[window.Lang]['loading事件正文'] }
				        </Scrollbars>
			        </div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.desc}>{ this.state.txt }</div>
					<div className={styles.number}>{ this.state.progressPCT }%</div>
					<div className={styles.progress}>
						<div className={styles.inner} style={{
							WebkitClipPath: `polygon(0% 0%, ${this.state.progressPCT}% 0%, ${this.state.progressPCT}% 100%, 0% 100%)`,
							clipPath: `polygon(0% 0%, ${this.state.progressPCT}% 0%, ${this.state.progressPCT}% 100%, 0% 100%)`
						}}></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Progress;