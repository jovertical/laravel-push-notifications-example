self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        // Notifications aren't supported or permission not granted!
        return;
    }

    if (event instanceof PushEvent) {
        const message = event.data?.json();

        console.log(message);

        event.waitUntil(
            self.registration.showNotification(message.title, {
                body: message.body,
                icon: message.icon,
                actions: message.actions,
            })
        );
    }
});
