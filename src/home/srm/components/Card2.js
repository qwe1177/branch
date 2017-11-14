import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export default class Card2 extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (
            <div className="briefly-card">
                <h1 className='header'>供应商总览</h1>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>我的供应商</div>
                    <div className='count'>24111935	</div>
                    <div className='modify-info'>本周新增加5条,环比上周<span className='trend-up'>&uarr;200%</span></div></div>
                    <div className='column-2'><div className='title'>下属供应商</div
                    ><div className='count'>24111935</div>
                    <div className='modify-info'>本周新增加5条,环比上周<span className='trend-down'>&darr;200%</span></div></div>
                </div>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>公海供应商</div>
                    <div className='count'>24111935</div>
                    <div className='modify-info'>本周新增加5条,转化4条</div></div>
                    <div className='column-2'><div className='title'>全部供应商</div>
                    <div className='count'>24111935</div>
                    <div className='modify-info'>本周新增加5条,环比上周<span className='trend-up'>&uarr;200%</span></div></div>
                </div>
            </div>
        );
    }
}
