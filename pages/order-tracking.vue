<script setup lang="ts">
// Example orders showing different states and variations
const orders = [
    {
        // New order - just received
        orderId: 'S-241030007',
        awb: null,
        amount: 457.92,
        status: 'processing',
        company: {
            name: 'Ecas Electro S.R.L',
            initial: 'E',
        },
        address: 'Bd. Dimitrie Pompei Nr. 8, Sector 2, Bucuresti, 90210, Romania',
        billingStatus: 'pending',
        orderDate: new Date('2024-11-27'),
        trackingStatus: {
            processing: true,
            packaging: false,
            transit: false,
            fulfilled: false,
        },
    },
    {
        // New order - just received
        orderId: 'S-241030007',
        awb: null,
        amount: 457.92,
        status: 'processing',
        company: {
            name: 'Ecas Electro S.R.L',
            initial: 'E',
        },
        address: 'Bd. Dimitrie Pompei Nr. 8, Sector 2, Bucuresti, 90210, Romania',
        billingStatus: 'paid',
        orderDate: new Date('2024-11-27'),
        trackingStatus: {
            processing: true,
            packaging: false,
            transit: false,
            fulfilled: false,
        },
    },
    {
        // Order in processing
        orderId: 'S-241030008',
        awb: 'MOP524103008',
        amount: 892.5,
        status: 'packaging',
        company: {
            name: 'Tech Solutions Ltd',
            initial: 'T',
        },
        address: '123 Tech Avenue, Silicon Valley, CA 94025, USA',
        billingStatus: 'paid',
        orderDate: new Date('2024-11-26'),
        trackingStatus: {
            processing: true,
            packaging: true,
            transit: false,
            fulfilled: false,
        },
    },
    {
        // Order shipped
        orderId: 'S-241030009',
        awb: 'MOP524103009',
        amount: 1250.0,
        status: 'transit',
        company: {
            name: 'Global Imports Co',
            initial: 'G',
        },
        address: '45 Harbor Street, Port City, PC 12345, Netherlands',
        billingStatus: 'paid',
        orderDate: new Date('2024-11-25'),
        trackingStatus: {
            processing: true,
            packaging: true,
            transit: true,
            fulfilled: false,
        },
    },
    {
        // Delivered order
        orderId: 'S-241030010',
        awb: 'MOP524103010',
        amount: 678.25,
        status: 'fulfilled',
        company: {
            name: 'City Electronics',
            initial: 'C',
        },
        address: '789 Main Street, Downtown, NY 10001, USA',
        billingStatus: 'paid',
        orderDate: new Date('2024-11-24'),
        trackingStatus: {
            processing: true,
            packaging: true,
            transit: true,
            fulfilled: true,
        },
    },
];
</script>

<template>
    <div class="flex flex-col gap-6 pt-6 max-w-[1392px] mx-auto w-full container">
        <h1 class="text-2xl font-bold text-zinc-800">Order Tracking Examples</h1>

        <div class="grid gap-6">
            <OrderTracking v-for="order in orders" :key="order.orderId" :order="order" />
        </div>
    </div>
</template>
