import React from 'react';
import { Link } from 'dva/router';
import styles from './index.less';

class SubHeader extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<div className={styles.header}>
				<Link to="/indexPage"><div className={styles.back}></div></Link>
				<div className={styles.txt}>{ this.props.title }</div>
				{/*<div className={styles.FAQ}><Link to="/faq" style={{color: '#f9dd6e'}}>FAQ</Link></div>*/}
			</div>
		);
	}
}

export default SubHeader;