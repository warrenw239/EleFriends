import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Elephant from './elephants.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBar: '',
      elephants: [],
      friends: [],
      oldName: '',
      newName: '',
    };
    // this.typing = this.typing.bind(this);
    this.getElephantList = this.getElephantList.bind(this);
    this.addToDB = this.addToDB.bind(this);
    this.deleteFriends = this.deleteFriends.bind(this);
    this.updateOldName = this.updateOldName.bind(this);
    this.updateNewName = this.updateNewName.bind(this);
  }

  updateOldName(e) {
    this.setState({ oldName: e.target.value });
  }
  updateNewName(e) {
    this.setState({ newName: e.target.value });
    // console.log(e.target.value);
  }

  updateName(oldName, newName) {
    oldName = this.state.oldName;
    newName = this.state.newName;
    axios({
      method: 'post',
      url: 'http://localhost:8080/friends',
      params: {
        oldName: oldName,
        newName: newName,
      },
    }).then(
      axios({
        method: 'get',
        url: 'http://localhost:8080/friends',
      }).then((friends) => {
        this.setState({
          friends: friends.data,
        });
      })
    );
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/friends',
    }).then((friends) => {
      this.setState({
        friends: friends.data,
      });
      // console.log(this.state.friends);
    });
  }

  // typing(e) {
  //   // this.setState({ searchBar: e.target.value });
  //   ;
  // }

  getElephantList() {
    console.log('looking for new data.');
    axios({
      method: 'get',
      url: 'http://localhost:8080/data',
    }).then((elephants) => {
      // console.log(elephants.data);
      this.setState({
        elephants: elephants.data,
      });
      // console.log(this.state.elephants);
    });
  }

  addToDB(elephant) {
    axios({
      method: 'post',
      url: 'http://localhost:8080',
      params: {
        Ename: elephant.Ename,
        image: elephant.image,
        species: elephant.species,
        sex: elephant.sex,
        note: elephant.note,
      },
    }).then(
      axios({
        method: 'get',
        url: 'http://localhost:8080/friends',
      }).then((friends) => {
        this.setState({
          friends: friends.data,
        });
      })
    );
  }

  deleteFriends() {
    axios({
      method: 'put',
      url: 'http://localhost:8080/friends',
    }).then(
      axios({
        method: 'get',
        url: 'http://localhost:8080/friends',
      }).then((friends) => {
        this.setState({
          friends: friends.data,
        });
      })
    );
    console.log('deleting...');
  }

  render() {
    return (
      <div>
        <h1>EleFriends</h1>
        <button onClick={this.getElephantList}>Find new Elefriends</button>
        <input
          type='text'
          placeholder='not currently in use'
          // onChange={this.typing}
        ></input>
        {/* <button onClick={}>look for a specific friend</button> */}
        <button onClick={() => this.deleteFriends()}>delete all friends</button>
        <div style={{ backgroundColor: 'lightGreen' }}>
          <h4>Update A Friends Name</h4>
          <input
            onChange={this.updateOldName}
            type='text'
            placeholder='old name'
          />
          <input
            onChange={this.updateNewName}
            type='text'
            placeholder='new name'
          />
          <button onClick={() => this.updateName()}>
            Click to update friends name
          </button>
        </div>
        <h3>here are your current friends</h3>

        {this.state.friends.map((friend) => {
          return (
            <div style={{ backgroundColor: 'lightGreen' }}>
              <Elephant
                name={friend.Ename}
                image={friend.image}
                species={friend.species}
                sex={friend.sex}
                note={friend.note}
                key={friend._id}
              />
            </div>
          );
        })}

        {this.state.elephants.map((elephant) => {
          if (elephant != null) {
            return (
              <div
                style={{ 'background-color': 'grey', border: '10px' }}
                key={elephant._id}
                onClick={() => this.addToDB(elephant)}
              >
                <h3>Pick some new friends</h3>
                <Elephant
                  name={elephant.Ename}
                  image={elephant.image}
                  species={elephant.species}
                  sex={elephant.sex}
                  note={elephant.note}
                />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default App;