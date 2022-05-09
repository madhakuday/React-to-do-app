import React, { Component } from 'react';
import Test from './Test';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

function getLocalItem() {
  const localitem = localStorage.getItem('ListItem');

  if (localitem) {
    return JSON.parse(localStorage.getItem('ListItem'));
  } else {
    return [];
  }
}

export default class main extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onListDelClick = this.onListDelClick.bind(this);
    this.onListUpdClick = this.onListUpdClick.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);

    this.state = {
      text: '',
      data: getLocalItem(),
      loading: false,
      isUpdate: false,
      userid: '',
      setlocaodata: getLocalItem(),
    };
  }

  calllistitem() {
    axios.get('/getlistdata').then((response) => {
      this.setState({ data: response.data });
    });
  }
  async onClick() {
    if (this.state.text.trim() === '') {
      return false;
    }

    // const ToDo = {
    //   name: this.state.text,
    //   isActive: true,
    //   id: uuid(),
    // };
    // this.setState({ data: [...this.state.data, ToDo], text: '' }, () => {
    //   // console.log('updated data is  ', this.state.data);
    //   localStorage.setItem('ListItem', JSON.stringify(this.state.data));
    // });

    this.setState({ text: '' });
    document.getElementById('inpfild').focus();

    axios
      .post('/postlistdata', {
        name: this.state.text,
      })
      .then((res) => {
        // console.log('res data ', res.data);
        return res;
      });
    this.calllistitem();
  }

  onListDelClick(x) {
    axios.post(`/deletelistdata/${x._id}`).then((response) => {});
    this.calllistitem();
    // console.log('x value is ', x);
    // const arr = this.state.data.map((s) => {
    //   if (s.id === x.id) {
    //       s.isActive = false;
    //   }
    //   return s;
    // });
    // // this.setState({ data: arr });
    // // localStorage.setItem('ListItem', JSON.stringify(arr));
  }

  onListUpdClick(i) {
    document.getElementById('inpfild').focus();

    this.setState({ text: i.name, isUpdate: true, userid: i._id });
  }

  onUpdateClick() {
    axios.post(`/updatelistdata/${this.state.userid}`, {
      name: this.state.text,
    });

    this.calllistitem();

    // const obj = this.state.data.map((val) => {
    //   if (val.id === this.state.userid) {
    //     val.name = this.state.text;
    //   }
    //   return val;
    // });

    // console.log('obj ia ', obj);

    this.setState({ isUpdate: false, text: '' });
    // localStorage.setItem('ListItem', JSON.stringify(obj));

    setTimeout(() => {
      alert('data saved ');
    }, 100);
  }

  async componentDidMount() {
    this.calllistitem();
  }

  render() {
    return (
      <>
        <div className="container bg-gray-100">
          <div className="search d-flex mt-2">
            <input
              autoComplete="off"
              type="text"
              className="form-control"
              placeholder="Description"
              onChange={(e) => {
                this.setState({ text: e.target.value });
              }}
              value={this.state.text}
              id="inpfild"
            />

            {this.state.isUpdate === true ? (
              <button className="btn btn-primary" onClick={this.onUpdateClick}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={this.onClick}>
                Add
              </button>
            )}
          </div>

          <div className="container">
            <Test
              data={this.state.data}
              setlocaodata={this.state.setlocaodata}
              onListDelClick={this.onListDelClick}
              onListUpdClick={this.onListUpdClick}
              upbtnval={this.state.isUpdate}
            />
          </div>
        </div>
      </>
    );
  }
}
