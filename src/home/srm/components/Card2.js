import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export default class Card2 extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    getUporDown =(trend)=>{
        if(trend=='up'){
            return '&uarr;';
        }else if(trend=='down'){
            return '&darr;';
        }else{
            return '';
        }
    }
    render() {
        const mockCard2Data = {
            wode: { count: 564, add: 5, trend:'up', rate: '100%' },
            xiashu: { count: 654, add: 5, trend:'down', rate: '80%'},
            gonghai: { count: 645, add: 5, turn: 4 },
            quanbu: { count: 645, add: 5, trend:'just', rate: '0%' }
        }
        const d = this.props.data;
        return (
            <div className="briefly-card">
                <h1 className='header'>供应商总览</h1>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>我的供应商</div>
                    <div className='count'>{d.wode.count}	</div>
                    <div className='modify-info'>本周新增加{d.wode.add}条,环比<span className={d.wode.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(d.wode.trend)+d.wode.rate }}></span></div></div>
                    <div className='column-2'><div className='title'>下属供应商
                    </div><div className='count'>{d.xiashu.count}</div>
                    <div className='modify-info'>本周新增加{d.xiashu.add}条,环比<span className={d.xiashu.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(d.xiashu.trend)+d.xiashu.rate }}></span></div></div>
                </div>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>公海供应商</div>
                    <div className='count'>{d.gonghai.count}</div>
                    <div className='modify-info'>本周新增加{d.gonghai.add}条,转化{d.gonghai.turn}条</div></div>
                    <div className='column-2'><div className='title'>全部供应商</div>
                    <div className='count'>{d.quanbu.count}</div>
                    <div className='modify-info'>本周新增加{d.quanbu.add}条,环比<span className={d.quanbu.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(d.quanbu.trend)+d.quanbu.rate }}></span></div></div>
                </div>
            </div>
        );
    }
}
