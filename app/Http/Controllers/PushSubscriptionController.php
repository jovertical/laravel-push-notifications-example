<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
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
            Arr::get($input, 'endpoint'),
            Arr::get($input, 'keys.p256dh'),
            Arr::get($input, 'keys.auth')
        );
    }

    public function destroy(PushSubscription $subscription): Response
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $user->deletePushSubscription($subscription->endpoint);

        return response()->noContent();
    }
}
