import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 3px;
background-color: white;
border: 1px solid lightgrey;
border-radius: 2px;
`;

class Patient extends React.Component {

  render() {
    let { age, patientId, observations } = this.props.patient
    return (
      <Draggable draggableId={patientId} index={this.props.index}>
        {provided => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p>Patient ID: {patientId}</p>
            <p>Patient Status: {observations[0].status}</p>
            <p>Patient Age: {age}</p>

          </Container>
        )}
      </Draggable >
    );
  }
}

export default Patient;