import React, { 
  Component 
} from 'react';
import io from 'socket.io-client';

class Chat extends Component {

  constructor (props) {
    super(props)
    this.state = {
      message: '',
      name: localStorage.getItem('name') || null,
      messages: [],
    }

    this.socket = null;
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.socket = io('https://cm-socket-io-chat-room.herokuapp.com/');

    this.socket.on('connect', () => {
      console.log('connect on room '+params.room);
      this.socket.emit('join-room', params.room);
    });

    this.socket.on('message', data => {
      console.log(data);
      this.setState({
        messages: [
          ...this.state.messages, data
        ]
      });
    });

    this.socket.on('event', data => {
      console.log(data);
    });

    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  send(event) {
    const { match: { params } } = this.props;

    event.preventDefault();

    this.socket.emit('message', {
      room: params.room,
      name: this.state.name,
      message: this.state.message
    });
    this.setState({
      message: ''
    });
  }

  handleChange(event) {
    event.persist();
    
    let value = null;

    if (event.target.type === 'file') {
      value = event.target.files[0];
    } else if (event.target.type === 'checkbox') {
      value = event.target.checked
    } else {
      value = event.target.value;
    }

    this.setState({
      [event.target.name]: value
    });
  }

  render() {
    const { match: { params } } = this.props;

    return (
      <div>
        <h1>You are on {params.room} channel</h1>
        <form
          onSubmit={event => {this.send(event)}}>
          <input 
            type="text"
            name="message"
            value={this.state.message}
            onChange={event => this.handleChange(event)}
          />
          <button
            type="submit">
            Send
          </button>
        </form>
        <div>
          {this.state.messages.map(data => {
            return (
              <div>
                {data.name} : {data.message}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Chat;