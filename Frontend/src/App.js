import React from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummyData';
import Column from './Column.js'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = dummyData;
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

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

    if(type==='column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    
    if(start === finish) {
      const newPatientIds = Array.from(start.patientIds);
      newPatientIds.splice(source.index, 1);
      newPatientIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        patientIds: newPatientIds
      }
      console.log("old column", start, "new column", newColumn);
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [start.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }

    // start and finish columns are different
    const startPatientIds = Array.from(start.patientIds);
    startPatientIds.splice(source.index, 1);
    const newStart = {
      ...start,
      patientIds: startPatientIds,
    };

    const finishPatientIds = Array.from(finish.patientIds);
    finishPatientIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      patientIds: finishPatientIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="allColumns" direction="horizontal" type="column">
          {(provided) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId];
              const patients = column.patientIds.map(patientId => this.state.patients[patientId]);
              return <Column key={column.id} column={column} patients={patients} index={index} />
            })}
            {provided.placeholder}
          </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default App;
