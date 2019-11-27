import React from 'react';
import SubHeader from '../SubHeader';
import styles from './index.less';

class SubContent extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render() {
		return (
			<div>
				<SubHeader 
					title={this.props.title}
				/>
				<div className={styles.cont}>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default SubContent;