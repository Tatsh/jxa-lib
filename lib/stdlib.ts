ObjC.import('stdlib');

ObjC.bindFunction('free', ['void', ['void*']]);
ObjC.bindFunction('malloc', ['void*', ['int']]);

export const _Exit = $._Exit;
export const abort = $.abort;
export const atexit = $.atexit;
export const arc4random = $.arc4random;
export const arc4random_addrandom = $.arc4random_addrandom;
export const arc4random_buf = $.arc4random_buf;
export const arc4random_stir = $.arc4random_stir;
export const arc4random_uniform = $.arc4random_uniform;
export const atof = $.atof;
export const atoi = $.atoi;
export const atoll = $.atoll;
export const exit = $.exit;
export const free = $.free;
/** Will throw if the environment variable does not exist. */
export const getenv = $.getenv;
export const malloc = $.malloc;
export const putenv = $.putenv;
export const rand = $.rand;
export const setenv = $.setenv;
export const srand = $.srand;
export const strtod = $.strtod;
export const strtof = $.strtof;
export const strtold = $.strtold;
export const system = $.system;
export const unsetenv = $.unsetenv;
