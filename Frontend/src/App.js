import React from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummyData';
import Column from './Column.js'
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  state = dummyData;
  onDragEnd = result => {
    // Fuckin really bud.
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const patients = column.patientIds.map(patientId => this.state.patients[patientId]);
          return <Column key={column.id} column={column} patients={patients} />
        })}
      </DragDropContext>
    );
  }
}

export default App;
