'use strict';

import { FormBuilder } from '../app/builder/FormBuilder';

/**
 * @param {HTMLFormElement} element
 * @return {FormBuilder}
 */
function registrationForm(element) {
  return new FormBuilder(element)
    .add('firstname')
    .notBlank('Vous devez spécifier votre prénom.')
    .min(1, 'Votre prénom doit faire au moins 2 charactères.')
    .add('lastname')
    .notBlank('Vous devez spécifier votre nom de famille.')
    .min(1, 'Votre nom de famille doit faire au moins 2 charactères.')
    .add('email')
    .notBlank('Vous devez spécifier une addresse mail.')
    .email("Votre addresse mail n'est pas valide.")
    .add('birthdate')
    .date('Veuillez entrer une date valide')
    .add('participations')
    .number('Vous devez entrer un nombre valide')
    .add('location', 'multiple')
    .required('Veuillez choisir la ville ou vous souhaitez participer.')
    .add('terms-and-conditions')
    .required("Vous devez accepter les conditions d'utilisation")
    .add('subscribe')
    .getForm();
}

export { registrationForm };
