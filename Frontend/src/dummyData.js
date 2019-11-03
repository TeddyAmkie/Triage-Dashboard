const dummyData = {
  patients: {
    'patient-001': { patientId: '001', firstName: 'John', lastName: 'Doe', age: '20', observations:[{status: 'sever', bloodPressure: '20/80'}, {status: 'minor', bloodPressure: '100/70'}]},
    'patient-002': { patientId: '002', firstName: 'Jane', lastName: 'Doe', age: '135', observations:[{status: 'expectant', bloodPressure: '0/0'}, {status: 'minor', bloodPressure: '100/70'}]},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Severe',
      patientIds: ['patient-001', 'patient-002'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Minor',
      patientIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
};

export default dummyData;