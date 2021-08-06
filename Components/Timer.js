// wraps timer in a card and returns the card

import { Component} from 'react';
import { Card, Progress, Button, Divider } from 'antd';
import { PlayCircleOutlined,CloseCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import notification from '../Sounds/notification.wav'

var minutesTimer; //internal to count minutes
var secondsTimer; //internal to count seconds
var notificationSound = new Audio(notification); //notification soud that plays after timer is finished

class Timer extends Component {
    state = {
        percent: 0,
        minutes: '00',
        seconds: '00',
        toggle: true,
        complete: false,
        button: <PlayCircleOutlined />
      };
      handleCancel = () =>{  //handles the cancel button
        clearInterval(minutesTimer);
        clearInterval(secondsTimer);
          this.setState({percent: 0,
            minutes: '00',
            seconds: '00',
            toggle: true,
            complete: false,
            button: <PlayCircleOutlined />})
      }

      handleClick = (toggle) =>{ //handles the play/pause button clicks
          if(this.state.complete){ //executes if timer is already complete and resets the timer
              this.setState({minutes:0,percent:0,seconds:0})
          }

          if(toggle){ // executes for 5 minutes if play button is clicked
                  minutesTimer = setInterval(() =>{
                      this.setState({minutes:++this.state.minutes})
                      if(this.state.minutes === 5){ //stops timer when 5 minutes is reached
                        this.setState({seconds:0,percent:100,button:<PlayCircleOutlined />,toggle:true,complete:true})
                        clearInterval(minutesTimer);
                        clearInterval(secondsTimer);
                        notificationSound.play();
                      }
                      else this.setState({complete:false})
                  },60000)
                  secondsTimer = setInterval(() =>{
                      this.setState({seconds:++this.state.seconds,percent:this.state.percent+=0.3})
                      if(this.state.seconds === 60){
                      this.setState({seconds:0})
                      }
                  },1000)
              this.setState({ //changes the button icon to pause icon
                toggle: !toggle, 
                button: <PauseCircleOutlined /> 
              })
          }
          else{ // executes if pause button is clicked
              clearInterval(minutesTimer);
              clearInterval(secondsTimer);
              this.setState({ //changes the button icon to play icon
                toggle: !toggle,
                complete: false,
                button: <PlayCircleOutlined />
              })
          }
      }
    render() {
        return (
            <Card className = 'card'>

            <Progress 
             type="circle"
             strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
             format={() => `${this.state.minutes.toString().padStart(2, '0')} : ${this.state.seconds.toString().padStart(2, '0')}`} // to achieve the format '00:00'
             percent={this.state.percent} />

             <Divider style={{ marginTop:'85px'}} plain></Divider>

              <Button 
              className="drop-shadow" 
              style={{ marginRight:'5px', backgroundColor:'#87d068',border:'none'}} 
              type="primary" shape="round" 
              onClick={() => this.handleClick(this.state.toggle)} 
              icon={this.state.button} 
              size={'large'}></Button> {/*play/pause button */}
              
             <Button 
             className="drop-shadow" 
             style={{ marginLeft:'5px',backgroundColor:'#CC0000',border:'none'}} 
             type="primary" shape="round" 
             onClick={() => this.handleCancel()} 
             icon={<CloseCircleOutlined />} 
             size={'large'}></Button>{/*cancel button */}

            </Card>
        )
    }
}

export default Timer