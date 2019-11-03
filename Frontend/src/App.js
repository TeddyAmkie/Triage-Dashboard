import React from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummyData';
import Column from './Column.js'
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
  state = dummyData;
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // If no destination do nothing.
    if (!destination) {
      return;
    }
    // Do not re-render if dropping at original spot.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newPatientIds = Array.from(column.patientIds);
    newPatientIds.splice(source.index, 1);
    newPatientIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      patientIds: newPatientIds
    }
    console.log("old column", column, "new column", newColumn);

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [column.id]: newColumn
      }
    };
    this.setState(newState);
  };
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
