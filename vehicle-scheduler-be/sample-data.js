const depots = [
  { ID: 1, MechanicHours: 60 },
  { ID: 2, MechanicHours: 135 },
  { ID: 3, MechanicHours: 188 },
  { ID: 4, MechanicHours: 97 },
  { ID: 5, MechanicHours: 164 }
];

const vehicles = [
  { TaskID: '264e638f-1c7a-4d67-9f9c-53f3d1766d37', Duration: 1, Impact: 5, depotId: 1 },
  { TaskID: '73ce9dca-1536-4a7a-9f1e-c67083afad61', Duration: 6, Impact: 2, depotId: 1 },
  { TaskID: '4b6e22ee-b4ed-45a4-a6af-5294b0d69f37', Duration: 1, Impact: 3, depotId: 2 },
  { TaskID: '08d00114-9506-463d-ba2e-3343ec4e2e89', Duration: 6, Impact: 6, depotId: 3 },
  { TaskID: 'a1e0b8e6-1076-4a2f-b83b-5e6017900033', Duration: 6, Impact: 1, depotId: 4 },
  { TaskID: '52635341-7c5f-475a-9839-4676f8fe5fd4', Duration: 1, Impact: 5, depotId: 3 },
  { TaskID: '9e08defa-7bb5-4a83-9e29-417165922894', Duration: 6, Impact: 9, depotId: 4 },
  { TaskID: 'f92b0f39-35ec-47c3-a465-3e49c22185b6', Duration: 2, Impact: 5, depotId: 5 },
  { TaskID: '65c0d74a-82ef-4fcc-9d85-9b082bb85310', Duration: 5, Impact: 7, depotId: 5 },
  { TaskID: '68ee2f8d-4145-4472-bce9-1d0968a8092a', Duration: 1, Impact: 1, depotId: 2 }
];

module.exports = { depots, vehicles };
