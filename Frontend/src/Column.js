import React from 'react';
import styled from 'styled-components';
import Patient from './Patient.js';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
`;

const Title = styled.h3`
padding:8px;
`;
const PatientList = styled.div`
padding:8px;
`;

class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
            <PatientList
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {this.props.patients.map((patient, index) =>
                <Patient key={patient.id} patient={patient} index={index} />)}
              {provided.placerholder}
            </PatientList>
          )}

        </Droppable>
      </Container>
    );
  }
}

export default Column;