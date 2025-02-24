'use strict';
const $image = document.querySelector('#photo-url');
if (!$image) throw new Error('image element does not exist');
$image.addEventListener('input', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget) throw new Error('no input value detected');
  $image.setAttribute('src', $eventTarget.value);
  console.log($eventTarget.value);
});
