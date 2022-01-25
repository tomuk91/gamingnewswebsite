<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        //header('Access-Control-Allow-Origin:  *');
        header('Access-Control-Allow-Origin:  http://localhost:4200');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: X-CSRF-Token, Content-Type, supports_credentials, withCredentials, X-Auth-Token, Authorization, Origin');
        header('Access-Control-Allow-Methods:  GET, POST, PUT, DELETE, OPTIONS');
        return $next($request);
    }
}
