<?php

/**
 * API для регистрации.
 * Принимает 4 параметра: email, password, first_name, last_name
 * Возвращает ответ в json-формате, который состоит из статуса регистрации(status = ok|error)
 * и массива ошибок errors, если регистрация не прошла валидацию.
 */
function ajaxRegistration($email, $password, $firstName, $lastName)
{

    $errors = validateAccountRegistrationData($email, $password, $firstName, $lastName);
    if ($errors) {
        return array(
            'status' => 'error',
            'errors' => $errors
        );
    }

    return array(
        'status' => 'ok'
    );
}

function validateAccountRegistrationData($email, $password, $firstName, $lastName)
{
    $errors = array();

    if (strlen($password) < 6) {
        $errors['password'] = 'At least 6 symbols';
    }

    if (strlen($password) > 24) {
        $errors['password'] = 'Shorten to 24 characters or less';
    }

    if (strlen($firstName) < 2) {
        $errors['first_name'] = 'At least 2 symbols';
    }

    if ((strlen($lastName) < 2) && ($lastName != '')) {
        $errors['last_name'] = 'At least 2 symbols';
    }

    if (preg_match('/[<>\"]/', $lastName)) {
        $errors['last_name'] = 'This value is not valid.';
    }

    if ($email == '' || !isEmailValid($email)) {
        $errors['email'] = 'Enter correct email address';
    }

    if ($email == 'regitered@example.com') {
        $errors['email'] = 'Such email already exists';
    }

    return $errors;
}

function isEmailValid($email)
{
    $validationExpression = '/^[-_a-z0-9\'+*$^&%=~!?{}]++(?:\.[-_a-z0-9\'+*$^&%=~!?{}]+)*+@(?:(?![-.])[-a-z0-9.]+(?<![-.])\.[a-z]{2,10}|\d{1,3}(?:\.\d{1,3}){3})$/iD';
    return (bool) preg_match($validationExpression, (string) $email);
}


$password  = isset($_POST['password'])   ? $_POST['password']   : null;
$email     = isset($_POST['email'])      ? $_POST['email']      : null;
$firstName = isset($_POST['first_name']) ? $_POST['first_name'] : null;
$lastName  = isset($_POST['last_name'])  ? $_POST['last_name']  : null;

$result = ajaxRegistration($email, $password, $firstName, $lastName);

echo json_encode($result);