interface Entry {
  title: string;
  photo: string;
  notes: string;
  entryId: number;
}

const $image = document.querySelector('.form-image');
if (!$image) throw new Error('image element does not exist');

const $input = document.querySelector('#photo-url');
if (!$input) throw new Error('image input form does not exist. ');

$input.addEventListener('input', (event: Event) => {
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

  const $eventTargetObject: Entry = {
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

function renderEntry(entry: Entry): HTMLElement {
  // <li class="row">
  //             <img
  //               src="images/placeholder-image-square.jpg"
  //               class="column-half" />
  //             <div class="column-half">
  //               <h2>text</h2>
  //               <p>flavor text</p>
  //             </div>
  //           </li>
  // li > img  == ( div  > h2 == p)
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photo);
  $img.classList.add('column-half');
  const $div = document.createElement('div');
  $div.classList.add('column-half');
  const $h2 = document.createElement('h2');
  $h2.innerText = entry.title;
  const $p = document.createElement('p');
  $p.innerText = entry.notes;

  // construct branch
  $div.appendChild($h2);
  $div.appendChild($p);
  $li.appendChild($img);
  $li.appendChild($div);

  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('no ul found in the document');
  $ul.appendChild($li);

  return $li;
}

document.addEventListener('DOMContentLoaded', () => {
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('no ul found in the document');
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});
