// @ts-check
'use strict';

/**
 * Makes sure every value of an array is not duplicated twice
 *
 * @template V
 * @param {V[]} array
 *
 * @return {V[]}
 */
export function arrayUnique(array) {
  return Array.from(new Set(array));
}
