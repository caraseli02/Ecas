<template>
  <section class="flex flex-col w-full">
    <header class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <h2 class="self-stretch my-auto text-base font-semibold text-zinc-800">Bank Details</h2>
      <OrderConfirmBankSelect />
    </header>
    <div class="flex flex-col mt-4 w-full text-sm leading-6 max-md:max-w-full">
    <dl>
      <div class="flex flex-wrap gap-3 items-center w-full max-md:max-w-full">
        <dt class="self-stretch my-auto text-gray-500">Bank Name:</dt>
        <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
          BANCA COMERCIALA ROMANA SA
        </dd>
      </div>
      <div class="flex flex-wrap gap-3 items-center mt-1 max-w-full w-[506px]">
        <dt class="self-stretch my-auto text-gray-500">Bank Address:</dt>
        <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800">
          Soseaua Orhideelor nr.15D, Cladire The Bridge 1, Bucuresti
        </dd>
      </div>
      <div class="flex flex-wrap gap-3 items-center mt-1 w-full max-md:max-w-full">
        <dt class="self-stretch my-auto text-gray-500">Account Number:</dt>
        <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
          72049717300001
        </dd>
      </div>
      <div class="flex flex-wrap gap-3 items-center mt-1 w-full whitespace-nowrap max-md:max-w-full">
        <dt class="self-stretch my-auto text-gray-500">SWIFT/BIC:</dt>
        <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
          RNCBROBU
        </dd>
      </div>
      <div class="flex flex-wrap gap-3 items-center mt-1 w-full max-md:max-w-full">
        <dt class="self-stretch my-auto text-gray-500">IBAN:</dt>
        <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
          RO58 RNCB 0072 0497 1730 0001
        </dd>
      </div>
    </dl>
  </div>
  </section>
</template>

<script lang="ts">
</script>
