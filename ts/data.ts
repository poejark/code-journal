// const data = {
//   view: 'entry-form',
//   entries: [],
//   editing: null,
//   nextEntryId: 1,
// };

const data = readModel();

function writeModel(): void {
  const dataModelJSON = JSON.stringify(dataModel);
  localStorage.setItem('dataModel', dataModelJSON);
}

if (!writeModel) throw new Error('writeModel function not found');

function readModel(): string[] {
  const dataModelJSON = localStorage.getItem('dataModel');
  if (dataModelJSON) {
    return JSON.parse(dataModelJSON);
  }
  return [];
}
