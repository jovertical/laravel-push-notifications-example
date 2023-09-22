<?php

namespace App\Http\Controllers;

use Illuminate\Support\Arr;
use NotificationChannels\WebPush\PushSubscription;

class PushSubscriptionController extends Controller
{
    public function store(): PushSubscription
    {
        $input = request()->validate([
            'endpoint' => 'required',
            'keys' => 'required|array',
            'keys.p256dh' => 'required',
            'keys.auth' => 'required',
        ]);

        /** @var \App\Models\User $user */
        $user = auth()->user();

        return $user->updatePushSubscription(
            ...Arr::only($input, ['endpoint', 'keys.p256dh', 'keys.auth']),
        );
    }

    public function destroy()
    {
        //
    }
}
