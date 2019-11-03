import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 3px;
background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
border: 1px solid lightgrey;
border-radius: 2px;
display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

class Patient extends React.Component {

  render() {
    let { age, patientId, observations } = this.props.patient
    return (
      <Draggable draggableId={patientId} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Handle />
            Patient ID: {patientId} Patient Status: {observations[0].status} Patient Age: {age}

          </Container>
        )}
      </Draggable >
    );
  }
}

export default Patient;