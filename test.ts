import { exit, free, malloc } from './lib/stdlib';
import { memchr } from './lib/string';

const enum Ascii {
    A = 97,
    B = 98,
    C = 99,
}

const z = malloc(4);
z[0] = Ascii.A;
z[1] = Ascii.B;
z[2] = Ascii.C;

const f = memchr(z, Ascii.B, 4);
console.log(f[0] === Ascii.B && f[1] === Ascii.C);

free(z);

exit(0);
