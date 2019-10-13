import { DispatchSemaphore } from '../lib/dispatch';
import fetch from '../lib/fetch';
import { exit, getenv } from '../lib/stdlib';
import { stringWithData } from '../lib/string';
import { sleep } from '../lib/unistd';

export default function fetchGoogle() {
  const sema = new DispatchSemaphore(0);

  fetch('https://www.google.com/')
    .then(x => {
      console.log(stringWithData(x.data!));
      sema.signal();
    })
    .catch(() => {
      console.log('Caught error');
      sema.signal();
    });

  while (sema.waitForever() != 0) {
    sleep(1);
  }
  return 0;
}

if ((getenv('_') as string).endsWith('fetch-google-command.ts')) {
  exit(fetchGoogle());
}
