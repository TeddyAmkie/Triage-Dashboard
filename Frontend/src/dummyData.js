const dummyData = {
  patients: {
    '001': { patientId: '001', firstName: 'John', lastName: 'Doe', age: '20', observations:[{status: 'severe', bloodPressure: '20/80'}, {status: 'minor', bloodPressure: '100/70'}]},
    '002': { patientId: '002', firstName: 'Jane', lastName: 'Doe', age: '135', observations:[{status: 'expectant', bloodPressure: '0/0'}, {status: 'minor', bloodPressure: '100/70'}]},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Severe',
      patientIds: ['002', '001'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Delayed',
      patientIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Minor',
      patientIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Expectant',
      patientIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default dummyData;