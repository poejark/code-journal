'use strict';
let noEntries = false;
const $image = document.querySelector('.form-image');
if (!$image) throw new Error('image element does not exist');
const $input = document.querySelector('#photo-url');
if (!$input) throw new Error('image input form does not exist. ');
$input.addEventListener('input', (event) => {
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
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('no ul found in the document');
  // if not editing
  if (data.editing === null) {
    data.nextEntryId += 1;
    data.entries.unshift($eventTargetObject);
    writeModel();
    $ul.prepend(renderEntry($eventTargetObject));
    viewSwap('entries');
    if (data.entries.length <= 0) {
      toggleNoEntries();
    } else if (data.entries.length >= 0 && noEntries === true) {
      toggleNoEntries();
    }
  } else {
    $eventTargetObject.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $eventTargetObject.entryId) {
        data.entries[i] = $eventTargetObject;
        const $targeti = document.querySelector(
          `i[data-entry-id="${$eventTargetObject.entryId}"]`,
        );
        if (!$targeti) throw new Error('target i not found.');
        const $targetLi = $targeti.closest('li');
        if (!$targetLi) throw new Error('target Li not found. ');
        $targetLi.replaceWith(renderEntry($eventTargetObject));
      }
      const $titleLabel = document.querySelector('#title-label');
      if (!$titleLabel) throw new Error('no label for title found');
      $titleLabel.innerText = 'New Entry';
      data.editing = null;
      writeModel();
    }
  }
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
function renderEntry(entry) {
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
  const $edit = document.createElement('i');
  $edit.classList.add('fa-solid');
  $edit.classList.add('fa-pencil');
  $edit.setAttribute('data-entry-id', `${entry.entryId}`);
  $edit.setAttribute('id', 'edit');
  const $titleWrapper = document.createElement('div');
  $titleWrapper.classList.add('column-full');
  $titleWrapper.classList.add('align');
  const $p = document.createElement('p');
  $p.innerText = entry.notes;
  // construct branch
  $titleWrapper.appendChild($h2);
  $titleWrapper.appendChild($edit);
  $div.appendChild($titleWrapper);
  $div.appendChild($p);
  $li.appendChild($img);
  $li.appendChild($titleWrapper);
  $li.appendChild($div);
  // const $ul = document.querySelector('ul');
  // if (!$ul) throw new Error('no ul found in the document');
  // $ul.appendChild($li);
  return $li;
}
const $ul = document.querySelector('ul');
if (!$ul) throw new Error('no ul found in the document');
$ul.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if ($eventTarget.id === 'edit') {
    for (let i = 0; i < data.entries.length; i++) {
      if (Number($eventTarget.dataset.entryId) === data.entries[i].entryId) {
        data.editing = data.entries[i];
        const $titleInput = document.querySelector('input[name="title"]');
        if (!$titleInput) throw new Error('no title form input');
        $titleInput.value = data.editing.title;
        const $titleLabel = document.querySelector('#title-label');
        if (!$titleLabel) throw new Error('no label for title found');
        $titleLabel.innerText = 'Edit Entry';
        const $photoInput = document.querySelector('input[name="photo"]');
        if (!$photoInput) throw new Error('no photo form input');
        $photoInput.value = data.editing.photo;
        $image.setAttribute('src', data.editing.photo);
        const $notesInput = document.querySelector('textarea[name="notes"]');
        if (!$notesInput) throw new Error('no text area input found');
        $notesInput.value = data.editing.notes;
      }
    }
    viewSwap('entry-form');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const $ul = document.querySelector('ul');
  if (!$ul) throw new Error('no ul found in the document');
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  if (data.entries.length <= 0) {
    toggleNoEntries();
  } else if (data.entries.length >= 0 && noEntries === true) {
    toggleNoEntries();
  }
});
function toggleNoEntries() {
  const $divNoEntries = document.querySelector('#no-entries');
  if (!$divNoEntries) throw new Error('no entries div does not exist.');
  noEntries = !noEntries;
  if (noEntries) {
    $divNoEntries.className = '';
  } else {
    $divNoEntries.className = 'hidden';
  }
}
function viewSwap(name) {
  data.view = name;
  writeModel();
  const $form = document.querySelector('#form-view');
  if (!$form) throw new Error('no form found');
  const $entries = document.querySelector('#entries-view');
  if (!$entries) throw new Error('entries view not found.');
  if (data.view === 'entry-form') {
    $form.classList.remove('hidden');
    $entries.classList.add('hidden');
    // show delete entry button if the form is in edit mode
    const $deleteEntry = document.querySelector('.delete-entry');
    if (!$deleteEntry) throw new Error('no delete entry in the document found');
    if (!data.editing) {
      $deleteEntry.classList.add('hidden');
    } else {
      $deleteEntry.classList.remove('hidden');
    }
  } else if (data.view === 'entries') {
    $form.classList.add('hidden');
    $entries.classList.remove('hidden');
  }
}
const $entriesBar = document.querySelector('#nav-bar-entries');
if (!$entriesBar)
  throw new Error('the new button was not found in the document.');
$entriesBar.addEventListener('click', () => {
  if (data.editing) {
    data.editing = null;
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
  }
  viewSwap('entries');
});
const $newButton = document.querySelector('.new');
if (!$newButton) throw new Error('new button not found in document.');
$newButton.addEventListener('click', () => {
  viewSwap('entry-form');
  const $titleLabel = document.querySelector('#title-label');
  if (!$titleLabel) throw new Error('no label for title found');
  $titleLabel.innerText = 'New Entry';
});
const $saveButton = document.querySelector('.submit');
if (!$saveButton) throw new Error('Save button not found.');
$saveButton.addEventListener('click', () => {
  viewSwap('entries');
});
const $deleteEntry = document.querySelector('.delete-entry');
if (!$deleteEntry) throw new Error('no delete entry in the document found');
const $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('no dialog found');
$deleteEntry.addEventListener('click', (event) => {
  event.preventDefault();
  $dialog.showModal();
});
const $modalDeleteEntry = document.querySelector('.modal-delete-entry');
if (!$modalDeleteEntry) throw new Error('no delete button found in modal.');
const $dismissModal = document.querySelector('.dismiss-modal');
if (!$dismissModal) throw new Error('no dismiss button found in modal.');
$dismissModal.addEventListener('click', (event) => {
  event.preventDefault();
  $dialog.close();
});
$modalDeleteEntry.addEventListener('click', (event) => {
  event.preventDefault();
  if (data.editing) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        console.log('point reached');
        data.entries.splice(i, 1);
        const $targeti = document.querySelector(
          `i[data-entry-id="${data.editing.entryId}"]`,
        );
        if (!$targeti) throw new Error('target i not found.');
        const $targetLi = $targeti.closest('li');
        if (!$targetLi) throw new Error('target Li not found. ');
        $targetLi.remove();
        //     const $titleLabel = document.querySelector(
        //       '#title-label',
        //     ) as HTMLHeadingElement;
        //     if (!$titleLabel) throw new Error('no label for title found');
        //     $titleLabel.innerText = 'New Entry';
        data.editing = null;
        $form.reset();
        writeModel();
        break;
      }
    }
  }
  if (data.entries.length <= 0) {
    toggleNoEntries();
  }
  $dialog.close();
  viewSwap('entries');
});
