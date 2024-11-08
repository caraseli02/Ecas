<template>
  <section class="flex flex-col w-full">
    <header class="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <h2 class="self-stretch my-auto text-base font-semibold text-zinc-800">Bank Details</h2>
      <OrderConfirmBankSelect @bank-select="selectedBank = bankData[$event]" />
    </header>
    <div class="flex flex-col mt-4 w-full text-sm leading-6 max-md:max-w-full" v-if="selectedBank">
      <dl>
        <div class="flex flex-wrap gap-3 items-center w-full max-md:max-w-full">
          <dt class="self-stretch my-auto text-gray-500">Bank Name:</dt>
          <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
            {{ selectedBank.bankName }}
          </dd>
        </div>
        <div class="flex flex-wrap gap-3 items-center mt-1 max-w-full w-[506px]">
          <dt class="self-stretch my-auto text-gray-500">Bank Address:</dt>
          <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800">
            {{ selectedBank.bankAddress }}
          </dd>
        </div>
        <div class="flex flex-wrap gap-3 items-center mt-1 w-full max-md:max-w-full">
          <dt class="self-stretch my-auto text-gray-500">Account Number:</dt>
          <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
            {{ selectedBank.accountNumber }}
          </dd>
        </div>
        <div class="flex flex-wrap gap-3 items-center mt-1 w-full whitespace-nowrap max-md:max-w-full">
          <dt class="self-stretch my-auto text-gray-500">SWIFT/BIC:</dt>
          <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
            {{ selectedBank.swift }}
          </dd>
        </div>
        <div class="flex flex-wrap gap-3 items-center mt-1 w-full max-md:max-w-full">
          <dt class="self-stretch my-auto text-gray-500">IBAN:</dt>
          <dd class="flex-1 shrink self-stretch my-auto basis-0 text-zinc-800 max-md:max-w-full">
            {{ selectedBank.iban }}
          </dd>
        </div>
      </dl>
    </div>
    <div v-else class="text-gray-500">Please select a bank to view its details.</div>
  </section>
</template>

<script setup lang="ts">

interface BankDetails {
  bankName: string
  bankAddress: string
  accountNumber: string
  swift: string
  iban: string
}

const bankData: Record<string, BankDetails> = {
  bcr_ron: {
    bankName: 'BANCA COMERCIALA ROMANA SA',
    bankAddress: 'Soseaua Orhideelor nr.15D, Cladire The Bridge 1, Bucuresti',
    accountNumber: '72049717300001',
    swift: 'RNCBROBU',
    iban: 'RO58 RNCB 0072 0497 1730 0001',
  },
  bcr_usd: {
    bankName: 'BANCA COMERCIALA ROMANA SA',
    bankAddress: 'Soseaua Orhideelor nr.15D, Cladire The Bridge 1, Bucuresti',
    accountNumber: '72049717300002',
    swift: 'RNCBROBU',
    iban: 'RO59 RNCB 0072 0497 1730 0002',
  },
  uni_ron: {
    bankName: 'UNICREDIT BANK',
    bankAddress: 'Bucuresti Piata Presei Libere, 1F Pipera Business Towers',
    accountNumber: '3159330',
    swift: 'BACXROBU',
    iban: 'RO33 BACX 0000 0000 3159 330',
  },
  patria_ron: {
    bankName: 'PATRIA BANK',
    bankAddress: 'Bucuresti Piata Nr. 42, Băneasa Pipera Building',
    accountNumber: '1002500489401',
    swift: 'CARPRO22',
    iban: 'RO58 CARP 0255 0255 5688 RON',
  },
  patria_usd: {
    bankName: 'PATRIA BANK',
    bankAddress: 'Bucuresti Piata Nr. 42, Băneasa Pipera Building',
    accountNumber: '1002500489402',
    swift: 'CARPRO22',
    iban: 'RO55 CARP 0255 0255 5688 USD',
  },
}

const selectedBank = ref<BankDetails | null>(null)
</script>
