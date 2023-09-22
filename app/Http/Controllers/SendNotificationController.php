<?php

namespace App\Http\Controllers;

use App\Notifications\ExampleNotification;
use Illuminate\Http\RedirectResponse;

class SendNotificationController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $user->notify(new ExampleNotification());

        return redirect()->route('dashboard');
    }
}
