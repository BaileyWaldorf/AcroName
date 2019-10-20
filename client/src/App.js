// /client/App.js
/*global chrome*/
import React, { Component } from 'react';
import AcronymCard from './AcronymCard';
import Alert from 'react-bootstrap/Alert';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      pageContent: "",
      acronyms: [],
      addAcronym: false,
      reportBug: false,
    };
    this.handleMessage = this.handleMessage.bind(this);
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleMessage);
    chrome.tabs.insertCSS({file:"Tooltip.css"});

    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
      }
    });

    // this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  handleMessage(msg) {
    // Handle received messages
    if (msg.action === 'getSource') {
      console.log("msg.source =" + msg.source);
      this.axiosGetAcronyms(msg.source)
        .then((res) => {
          console.log(res);
        })
      this.setState({pageContent: msg.source});
    }
   }

  axiosGetAcronyms = (text) => {
    return axios.get('http://localhost:3001/api/getAcronyms', {
      params: {
        text: text
      }
    })
    .then(response => {
      response = JSON.parse(response.data);
      console.log(response);
      // for(var i = 0; i < response.data.length; i++) {
      //   console.log(response.data[i]);
      // }
      this.setState({acronyms: response});
      // returning the data here allows the caller to get it through another .then(...)
      return response;
    })
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    chrome.runtime.onMessage.removeListener(this.handleMessage);
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  // getDataFromDb = () => {
  //   fetch('http://localhost:3001/api/getData')
  //     .then((data) => data.json())
  //     .then((res) => this.setState({ data: res.data }));
  // };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    console.log("adding data...");
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idToDelete) => {
    console.log("delting: " + idToDelete)
    parseInt(idToDelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      console.log("dat = " + dat.id + "idToDelete =" + idToDelete );
      if (dat.id == idToDelete) {
        console.log("found it")
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data:{
        id: objIdToDelete,
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const tags = ["Tag1", "Tag2", "Tag3"];
    return (
      <div style={{padding: "20px"}}>
        {/* 
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button> */}
          {this.state.acronyms.length > 0
          ? <Alert variant={'success'}>
              We found <b>{this.state.acronyms.length}</b> acronyms on this page!
            </Alert>
          : <Alert variant={'danger'}>
              Sorry, we didn't find any acronyms. You can manually add one below to help others.
            </Alert>
          }
          {this.state.acronyms.map((acronym) => 
            <AcronymCard acronym={acronym.acronym} phrase={acronym.phrases[0].phrase} tags={acronym.phrases[0].tags} />
          )}
          <ButtonToolbar>
            <Button
              variant="primary"
              onClick={() => {this.setState({addAcronym: true, reportBug: false})}}
            >
              Add New Acronym
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {this.setState({reportBug: true, addAcronym: false})}}
            >
              Report Bug
            </Button>
          </ButtonToolbar>
          {this.state.addAcronym
          ? <Form>
              <Form.Group controlId="addAcronymForm.acronym">
                <Form.Label>Acronym</Form.Label>
                <Form.Control placeholder="TYSM" />
              </Form.Group>
              <Form.Group controlId="addAcronymForm.phrase">
                <Form.Label>Phrase</Form.Label>
                <Form.Control placeholder="Thank You So Much" />
              </Form.Group>
              <Form.Group controlId="addAcronymForm.tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="Tags help us categorize acronyms. Please comma seperate (e.g. automotive, cars, trucks, etc.)"/>
              </Form.Group>
              <Button
                type="submit"
                onClick={() => {this.setState({addAcronym: false})}}
              >
                Submit
              </Button>
            </Form>
        : null}
        {this.state.reportBug
          ? <Form>
              <Form.Group controlId="reportBugForm.name">
              <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mike Rotch"
                />
              </Form.Group>
              <Form.Group controlId="reportBugForm.email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group controlId="reportBugForm.message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows="5" placeholder="My app has crashed! Chrome version: ..."/>
              </Form.Group>
              <Button
                type="submit"
                onClick={() => {this.setState({reportBug: false})}}
              >
                Submit
              </Button>
            </Form>
        : null}
        {/* </div> */}
      </div>
    );
  }
}

export default App;