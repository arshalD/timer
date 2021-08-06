import { PageHeader } from 'antd';
import react from 'react';
import 'antd/dist/antd.css';
import timer from '../Img/stopwatch.png';

function AppBar (){
    return (
        <PageHeader  // returns the app bar
        className="site-page-header"
        title='Timer'
        style={{justifyContent:'center'}}
        avatar={{src:timer}}
        />
    )
}

export default AppBar;