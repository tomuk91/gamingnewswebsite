<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use League\OAuth2\Server\Exception\OAuthServerException;
use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */



    public function report(Throwable $exception)
    {
        if ($exception instanceof OAuthServerException || $exception instanceof AuthenticationException) {

            if (isset($exception->guards) && isset($exception->guards()[0]) === 'api')
                response()->json('Unauthorized', 401);
            else if ($exception instanceof OAuthServerException)
                response()->json('Unauthorized', 401);
        }
        parent::report($exception);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return $request->expectsJson()
            ? response()->json(['message' => 'Unauthenticated.'], 401)
            : redirect()->guest(route('authentication.index'));
    }
}
