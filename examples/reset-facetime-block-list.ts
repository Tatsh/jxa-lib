const se = Application('System Events') as SystemEventsApplication;
const total = (se.processes['FaceTime']
    .windows['Preferences']
    .tabGroups[0]
    .scrollAreas[0]
    .tables[0]
    .rows.length);

Application('FaceTime').activate();
// tslint:disable-next-line:no-magic-numbers
delay(0.2);

for (let i = total; i >= 0; i--) {
    console.log(`${total - i} / ${total}`);
    // tslint:disable-next-line:no-magic-numbers
    se.keyCode(51);
}
