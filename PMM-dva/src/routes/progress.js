import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './progress.less';
import Logo from '../assets/progress_logo.png';

class Progress extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	progressPCT: 0,
	  	toPageState: false,
	  	txt: '加载中...',
	  };
	}

	componentDidMount() {
		this.progressFunc(this.getRandom(500, 50));
	}

	componentWillUnmount() {
		
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
					txt: '加载完成',
				})
			}
		}, dely)
  	}

	render() {
		return (
			<div className={styles.wrap}>
				<div className={styles.title}>
					<img src={Logo} />
				</div>
				<div className={styles.context}>
					<div className={styles.t}>
						<span className={styles.txt}>事件</span> 
						{this.state.toPageState && 
							<Link className={styles.toPage} to="/indexPage">跳过</Link>
						}
					</div>
					<div className={styles.desc}>
						<Scrollbars>
				        	<p>此外，特斯拉这3个版本的电动皮卡，都有全自动驾驶功能可供选择，配备这一功能需要额外加7000美元。另外如果，加入“DUE TODAY”，消费者还需要再加100美元，这样Cybertruck的售价最高就可达到7.7万美元。</p>
				        	<p>在发布会之后，特斯拉Cybertruck也已开始接受消费者的预订，目前预订页面已经开通，目前3个版本都可预订，3电机后轮驱动版预计在2022年底开始生产，另外两个版本预计在2021年第开始生产。</p>
				        </Scrollbars>
			        </div>
				</div>
				<div className={styles.bottom}>
					<div className={styles.desc}>{ this.state.txt }</div>
					<div className={styles.number}>{ this.state.progressPCT }%</div>
					<div className={styles.progress}>
						<div className={styles.inner} style={{width: this.state.progressPCT+'%'}}></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Progress;