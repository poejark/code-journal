'use strict';
const $image = document.querySelector('#photo-url');
if (!$image) throw new Error('image element does not exist');
$image.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('no input value detected');
  $image.setAttribute('src', $eventTarget.value);
});
const $submit = document.querySelector('.submit');
if (!$submit) throw new Error('no submit button found');
const $form = document.getElementById('formId');
if (!$form) throw new Error('no form found');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('no event target');
  const $title = $eventTarget.elements.namedItem('title');
  if (!$title) throw new Error('no title value');
  const $photo = $eventTarget.elements.namedItem('photo');
  if (!$photo) throw new Error('no photo value');
  const $notes = $eventTarget.elements.namedItem('notes');
  if (!$notes) throw new Error('no note value');
  const $eventTargetObject = {
    title: $title.value,
    photo: $photo.value,
    notes: $notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId += 1;
  data.entries.unshift($eventTargetObject);
  writeModel();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
