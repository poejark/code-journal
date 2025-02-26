const $image = document.querySelector('#photo-url');
if (!$image) throw new Error('image element does not exist');

$image.addEventListener('input', (event: Event) => {
  const $eventTarget = event.target as HTMLInputElement;
  if (!$eventTarget) throw new Error('no input value detected');
  $image.setAttribute('src', $eventTarget.value);
});

const $submit = document.querySelector('.submit');
if (!$submit) throw new Error('no submit button found');

const $form = document.getElementById('formId') as HTMLFormElement;
if (!$form) throw new Error('no form found');

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $eventTarget = event.target as HTMLFormElement;
  if (!$eventTarget) throw new Error('no event target');
  const $title = $eventTarget.elements.namedItem('title') as HTMLInputElement;
  if (!$title) throw new Error('no title value');
  const $photo = $eventTarget.elements.namedItem('photo') as HTMLInputElement;
  if (!$photo) throw new Error('no photo value');
  const $notes = $eventTarget.elements.namedItem(
    'notes',
  ) as HTMLTextAreaElement;
  if (!$notes) throw new Error('no note value');

  const $eventTargetObject: object = {
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
