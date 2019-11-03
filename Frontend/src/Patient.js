import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
margin: 3px;
border: 1px solid blue;
border-radius: 2px;
`;

class Patient extends React.Component {
  // setRef = ref => {
  //   // keep a ref to the dom ref as an instance prop...
  //   this.ref = ref;
  //   // give the dom ref to react-beautiful-dnd
  //   this.props.innerRef(ref);
  // };
  render() {
    let { age, patientId, observations } = this.props.patient
    console.log("hi qtpie, read this", this.props.patient)
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