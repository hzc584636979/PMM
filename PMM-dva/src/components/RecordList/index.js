import React from 'react';
import { Table, Popconfirm, Button } from 'antd';

const RecordList = ({ products }) => {
	const columns = [{
	    title: '投注金额',
	    dataIndex: 'eth',
	    render: (text, record) => {
			return `${text}ETH`
		},
	}, {
		title: '交易Hash',
		dataIndex: 'hash',
	}];

	return (
		<Table
			rowKey="hash"
			dataSource = { products }
			columns = { columns }
		/>	
	);
}

export default RecordList;