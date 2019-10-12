import { path } from 'ramda';

// The Preferences window in FaceTime must be already open for this to work
const se = Application('System Events');
const total = path<number>(
  [
    'processes',
    'FaceTime',
    'windows',
    'Preferences',
    'tabGroups',
    0,
    'scrollAreas',
    'tables',
    0,
    'rows',
    'length'
  ],
  se
)!;

Application('FaceTime').activate();
delay(0.2);

for (let i = total; i >= 0; i--) {
  console.log(`${total - i} / ${total}`);
  se.keyCode(51);
}
