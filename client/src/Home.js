import React, { 
  Component 
} from 'react';

class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      room: ''
    }
  }

  joinRoom(event) {
    event.preventDefault();

    if (this.state.room === '' || this.state.name === '') return false;

    localStorage.setItem('name', this.state.name);
    this.props.history.push('/chat/r/'+this.state.room);
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
    return (
      <div>
        <form
          onSubmit={event => {this.joinRoom(event)}}>
          <label>Name</label>
          <input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <label>Room Name</label>
          <input 
            type="text"
            name="room"
            value={this.state.room}
            onChange={event => this.handleChange(event)}
          />
          <br />
          <button
            type="submit">
            Save Name
          </button>
        </form>
      </div>
    );
  }
}

export default Home;