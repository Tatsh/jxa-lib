import fetch from '../lib/fetch';
import { exit } from '../lib/stdlib';
import { sleep } from '../lib/unistd';

ObjC.import('dispatch');
ObjC.import('unistd');

const main = () => {
  const sema = $.dispatch_semaphore_create(0);

  fetch('https://www.google.com/').then(x => {
    console.log(
      ObjC.unwrap(
        $.NSString.alloc.initWithDataEncoding(x.data!, $.NSASCIIStringEncoding)
      )
    );
    $.dispatch_semaphore_signal(sema);
  });

  while ($.dispatch_semaphore_wait(sema, $.DISPATCH_TIME_FOREVER) > 0) {
    sleep(1);
  }
  return 0;
};

exit(main());
