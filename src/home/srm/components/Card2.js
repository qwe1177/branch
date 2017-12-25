import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import { Spin} from 'antd';
import axios from '../../../util/axios'

import { connect_srm } from '../../../util/connectConfig';
import { getLoginInfo ,getUrlParams} from '../../../util/baseTool';




const defaultState = {
    "all": {
        "chainIndex": "100%",
        "count": 2,
        "thisWeekCount": 1,
        "trend": "up"
    },
    "my": {
        "chainIndex": "0%",
        "count": 0,
        "thisWeekCount": 0,
        "trend": "up"
    },
    "theHighSeas": {
        "count": 2,
        "thisWeekCount": 1,
        "thisWeekGetCount": 1
    },
    "underling": {
        "chainIndex": "0%",
        "count": 0,
        "thisWeekCount": 0,
        "trend": "up"
    }
};

export default class Card2 extends React.Component {
    state = {cardData:defaultState,isFetching:false}
    componentWillMount() {
        this.queryData();
    }
    getUporDown = (trend) => {
        if (trend == 'up') {
            return '&uarr;';
        } else {
            return '&darr;';
        }
    }
    queryData =()=>{
        var urlParams = getUrlParams();
        var moduleId = urlParams['moduleId']?urlParams['moduleId']:'';
        this.setState({ isFetching: true });
        var params = {moduleId};
        axios.get(connect_srm + '/management/viewSupplierTotal.do', { params: params ,timeout:20000}).then((res) => {
          if (res.data.code == '1') {
            this.setState({ cardData: res.data.data,isFetching: false });
          } else {
            this.setState({ isFetching: false });
          }
        }).catch((e) => {
          console.log(e);
          this.setState({ isFetching: false });
        });
    }
    render() {
        const { all, my, theHighSeas, underling } = this.state.cardData;
        return (
            <div className="briefly-card">
                <Spin spinning={this.state.isFetching}>
                <h1 className='header'>供应商总览</h1>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>我的供应商</div>
                        <div className='count'><a href='/suppliermanage/mysupplier/'>{my.count}</a>	</div>
                        <div className='modify-info'>本周新增加{my.thisWeekCount}条,环比
                    <span className={my.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(my.trend) + my.chainIndex }}></span>
                        </div>
                    </div>
                    <div className='column-2'><div className='title'>下属供应商
                    </div><div className='count'><a href='/suppliermanage/underlingsupplier/'>{underling.count}</a></div>
                        <div className='modify-info'>本周新增加{underling.thisWeekCount}条,环比
                    <span className={underling.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(underling.trend) + underling.chainIndex }}></span>
                        </div>
                    </div>
                </div>
                <div className='row clearfix'>
                    <div className='column-2'><div className='title'>公海供应商</div>
                        <div className='count'><a href='/suppliermanage/inseasupplier/'>{theHighSeas.count}</a></div>
                        <div className='modify-info'>本周新增加{theHighSeas.thisWeekCount}条,转化{theHighSeas.thisWeekGetCount}条</div>
                    </div>
                    <div className='column-2'><div className='title'>全部供应商</div>
                        <div className='count'><a href='/suppliermanage/allsupplier/'>{all.count}</a></div>
                        <div className='modify-info'>本周新增加{all.thisWeekCount}条,环比
                        <span className={all.trend} dangerouslySetInnerHTML={{ __html: this.getUporDown(all.trend) + all.chainIndex }}></span>
                        </div>
                    </div>
                </div>
                </Spin>
            </div>
        );
    }
}
