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
	  	txt: '加载中...',
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
					txt: '加载完成',
				})
			}
		}, dely)
  	}

	render() {
		const beInvitedCode = getUrlOptions().beInvitedCode;
		console.log(beInvitedCode)
		return (
			<div className={styles.wrap}>
				<div className={styles.title}>
					<img src={Logo} />
				</div>
				<div className={styles.context}>
					<div className={styles.t}>
						<span className={styles.txt}>事件</span> 
						{this.state.toPageState && 
							<Link className={styles.toPage} to={`/indexPage${beInvitedCode ? `?beInvitedCode=${beInvitedCode}` : ``}`}>跳过</Link>
						}
					</div>
					<div className={styles.desc}>
						<Scrollbars>
				        	<p>星历536年，隶属于地球国际的无限深空号恒星级战舰前往外太空执行任务的过程中，战舰的引擎发生故障，战舰无法减速转弯并返回地球，在漫长的时间里，无限深空号将会一直以光速的1/100朝漆黑的宇宙深处航行。</p>

							<p>为了重返太阳系，船员们必须修好发动机，但发动机损坏严重，根据推算，以当前的速度，在修好发动机后，飞船内剩余的燃料已经不足以支撑飞船减速、转弯、加速再减速的过程。</p>

							<p>即使将燃料主要用于两次减速阶段，只以最低燃料供给于加速阶段也是不可行的，根据推算，去除两次减速的燃料，剩余的燃料只能够将飞船加速至光速的1/10000，以这样的速度返回太阳系，几乎是不可能的，因为战舰的冬眠和生态维持系统无法坚持那么久的时间。</p>

							<p>最终，经过全体舰员的投票，决定放弃修复现有发动机的决定，并将资源投入到研发新型星舰发动机的研发上。</p>

							<p>但是，在新型发动机的研究方向上，战舰上却产生了相当大的分歧，有的舰员倾向于将研究方向朝有一定理论基础的电磁驱动引擎或中微子引擎发展，也有些极端的舰员建议将研究方向朝连可行性都没有确定的曲率驱动引擎或无限非概率引擎发展。</p>

							<p>这样的分歧最终导致战舰不得不同时将研究方向朝几个方向发展，但是战舰的资源有限，这样每个方向得研究都变的很不顺利。</p>
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