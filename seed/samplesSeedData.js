const todosSeedData = [
  {
    _id: '456789012345678901234567',
    fName: 'George',
    lName: 'Smiley',
    isHuman: true,
    identification: {
      idType: 'passport',
      idNumber: '111222333',
      expiryDate: new Date('2030-11-30T00:00:00Z'),
    },
    employmentHistory: [
      {
        employer: {
          employerName: 'MI5',
          employerAddress: 'Secret',
          employerTelephone: '08003334455',
        },
        responsibilities: [
          'Espionage',
          'Admin',
          'Cleaning',
        ],
        duration: 5,
      }
    ]
  },
  {
    _id: '567890123456789012345678',
    fName: 'Sally',
    lName: 'Smiley',
    isHuman: true,
    identification: {
      idType: 'passport',
      idNumber: '111222334',
      expiryDate: new Date('2030-01-02T00:00:00Z'),
    },
    employmentHistory: [
      {
        employer: {
          employerName: 'MI6',
          employerAddress: 'Secret',
          employerTelephone: '08003334456',
        },
        responsibilities: [
          'Spying',
          'Assassin',
        ],
        duration: 3,
      },
      {
        employer: {
          employerName: 'MI5',
          employerAddress: 'Secret',
          employerTelephone: '08003334455',
        },
        responsibilities: [
          'Agent Provocateur',
          'Killer',
        ],
        duration: 2,
      },
      {
        employer: {
          employerName: 'Carphone Warehouse',
          employerAddress: 'London',
          employerTelephone: '08003334457',
        },
        responsibilities: [
          'Sales',
        ],
        duration: 6,
      },
    ]
  },
  {
    _id: '678901234567890123456789',
    fName: 'Daisy',
    lName: 'Day',
    isHuman: true,
    identification: {
      idType: 'passport',
      idNumber: '111222345',
      expiryDate: new Date('2030-11-02T00:00:00Z'),
    },
    employmentHistory: [
      {
        employer: {
          employerName: 'Starbucks',
          employerAddress: 'High Street',
          employerTelephone: '08003334567',
        },
        responsibilities: [
          'Barista',
          'Toilet cleaner',
        ],
        duration: 3,
      },
      {
        employer: {
          employerName: 'UK Government',
          employerAddress: 'Whitehall',
          employerTelephone: '08003334450',
        },
        responsibilities: [
          'Prime minister',
          'Commons committee member',
          'Speaker',
          'Member of Parliament',
        ],
        duration: 14,
      },
    ]
  },
]

export default todosSeedData
