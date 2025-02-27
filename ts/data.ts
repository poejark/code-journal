interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [] as Entry[],
  editing: null,
  nextEntryId: 1,
};

function writeModel(): void {
  const dataModelJSON = JSON.stringify(data);
  localStorage.setItem('dataModel', dataModelJSON);
}

if (!writeModel) throw new Error('writeModel function not found');

function readModel(): Data {
  const dataModelJSON = localStorage.getItem('dataModel');
  if (dataModelJSON) {
    return JSON.parse(dataModelJSON) as Data;
  }
  return data;
}

data = readModel();
