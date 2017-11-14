import React, { Component } from 'react';
import './App.css';
import vueAxios from 'axios';
import 'antd/dist/antd.css';
import Card1 from '../components/Card1';
import Card2 from '../components/Card2';
import Card3 from '../components/Card3';
import TableCard from '../components/TableCard';
import ListCard from '../components/ListCard';


const mockCard1Data = {
	wode: { count: 2411935, add: 5, turn: 4 },
	xiashu: { count: 2411935, add: 5, turn: 4 },
	gonghai: { count: 2411935, add: 5, turn: 4 },
	quanbu: { count: 2411935, add: 5, turn: 4 }
}


const mockCard2Data = {
	wode: { count: 2411935, add: 5, turn: 4 },
	xiashu: { count: 2411935, add: 5, turn: 4 },
	gonghai: { count: 2411935, add: 5, turn: 4 },
	quanbu: { count: 2411935, add: 5, turn: 4 }
}

const mockCard3Data = {
	wode: { count: 2411935, add: 5, turn: 4 },
	xiashu: { count: 2411935, add: 5, turn: 4 },
	gonghai: { count: 10, add: 5, turn: 4 },
	quanbu: { count: 20, add: 5, turn: 4 }
}

class App extends Component {
	render() {
		return (
			<div className='home-page'>
				<h3 className="page-title">我的桌面</h3>
				<div className='page-main'>
					<div className="top-wrap clearfix">
						<div className='card-item'>
							<Card1 data={mockCard1Data} />
						</div>
						<div className='card-item'>
							<Card2 data={mockCard2Data} />
						</div>
						<div className='card-item'>
							<Card3 data={mockCard3Data} />
						</div>
					</div>
					<div className="bottom-wrap clearfix">
						<div className='list-item'>
							<ListCard />
						</div>
						<div className='list-item'>
							<TableCard />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App
