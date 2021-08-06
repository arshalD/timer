import logo from './logo.svg';
import react , {Component} from 'react';
import './App.css';
import AppBar from './Components/AppBar'
import { Row, Col, Divider } from 'antd';
import Timer from './Components/Timer'

class App extends Component {
 render() {
   return (
     <>
     <AppBar />
     <Row justify="center">
        <Timer />
     </Row>

    </>
   )
 }
}

export default App;
