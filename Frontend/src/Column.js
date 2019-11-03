import React from 'react';
import styled from 'styled-components';
import Patient from './Patient.js';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
width: 30%;
display: flex;
flex-direction: column;
background-color: white;
`;

const Title = styled.h3`
padding:8px;
`;
const PatientList = styled.div`
padding:8px;
transition: background-color 0.2s ease;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
flex-grow: 1;
min-height: 100px;
`;

class Column extends React.Component {
  render()
   {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
          <Title {...provided.dragHandleProps}>
            {this.props.column.title}
          </Title>
          <Droppable droppableId={this.props.column.id} type="task">
            {(provided, snapshot) => (
              <PatientList
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}>
                {this.props.patients.map((patient, index) =>
                  <Patient key={patient.patientId} patient={patient} index={index} />)}
                {provided.placeholder}
              </PatientList>
            )}
          </Droppable>
        </Container>
        )}
      </Draggable>
    );
  }
}

export default Column;