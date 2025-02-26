'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
function writeModel() {
  const dataModelJSON = JSON.stringify(data);
  localStorage.setItem('dataModel', dataModelJSON);
}
if (!writeModel) throw new Error('writeModel function not found');
function readModel() {
  const dataModelJSON = localStorage.getItem('dataModel');
  if (dataModelJSON) {
    return JSON.parse(dataModelJSON);
  }
  return data;
}
data = readModel();
