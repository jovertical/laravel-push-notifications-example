<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';

import PrimaryButton from '@/Components/PrimaryButton.vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { usePushNotifications } from '@/use/pushNotifications';

const { enabled } = usePushNotifications();

const send = () => {
    router.post(route('send-notification'));
};
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="flex justify-between items-center">
                        <div class="p-6 text-gray-900">
                            Receive a push notification
                        </div>

                        <form @submit.prevent="send" class="p-6">
                            <PrimaryButton type="submit" :disabled="!enabled">
                                Send
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
