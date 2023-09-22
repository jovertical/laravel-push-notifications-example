import { usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

import { urlBase64ToUint8Array } from '@/utils';

export function usePushNotifications() {
    const page = usePage();

    const enabled = ref(false);

    const subscribe = async () => {
        const registration = await navigator.serviceWorker.ready;

        return await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                import.meta.env.VITE_VAPID_PUBLIC_KEY
            ),
        });
    };

    const storeSubscription = async (subscription: PushSubscription) => {
        await fetch('/push-subscriptions', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': page.props.csrf_token as string,
            },
        });
    };

    const setup = async () => {
        const status = await Notification.requestPermission();

        if (status !== 'granted') {
            // The user doesn't want notifications

            return;
        }

        try {
            const subscription = await subscribe();

            await storeSubscription(subscription);

            enabled.value = true;
        } catch (error) {
            console.log(error);
        }
    };

    const activateSw = async () => {
        if (!('serviceWorker' in navigator)) {
            // Service Workers aren't supported

            return;
        }

        if (!('PushManager' in window)) {
            // Push API isn't supported by the browser
            return;
        }

        const res = await navigator.serviceWorker.register('/sw.js');

        return res.active?.state === 'activated';
    };

    onMounted(() => {
        const activated = activateSw();

        if (!activated) {
            return;
        }

        setup();
    });

    return {
        enabled,
    };
}
