import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'someother value',
    showPersons: false
  }

  // NOT NEED ANYMORE SINCE NO LONGER CALLING IT

  // switchNameHandler = (newName) => {
  //   // console.log('Was Clicked!');
  //   // DONT DO THIS!! this.state.persons[0].name = 'Maximillian';
  //   this.setState({persons: [
  //     { name: newName, age: 28 },
  //     { name: 'Manu', age: 29 },
  //     { name: 'Stephanie', age: 27 }
  //   ]
  // })
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //  Dont use this one because it will modify the state
    //  const person = this.state.persons[personIndex];
    
    // alternative would be less modern approach
    // const person = Object.assign({}, this.state.person[personIndex]);

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // We dont have to use below we're just calling that information here
    this.setState({persons: persons});

  // Dont have to use this anymore since we updated personIndex to haqndle this function.
  //   this.setState({
  //     persons: [
  //     { name: 'Max', age: 28 },
  //     { name: event.target.value, age: 29 },
  //     { name: 'Stephanie', age: 27 }
  //   ]
  // })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    // In ES6, spread [...] is all that is needed to accomplish this
    // creates copy of state
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name} 
            age={person.age} 
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
         </div>   
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    } 

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
     return (
        <div className="App">
          <h1>Hi, I'm a React App!</h1>
          <p className={classes.join(' ')}>This is really working!!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Person</button> 
            {persons}
        </div>
    );
    // return React.createElement ('div', null, React.createElement('h1', {className: 'App'}, 'Does this work now?'));
  }
}

export default App;
