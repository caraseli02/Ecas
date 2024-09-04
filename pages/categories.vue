<script setup lang="ts">
import { BookIcon, CopyIcon, MoveIcon, Trash2Icon, PlugIcon, MergeIcon, PencilLine } from 'lucide-vue-next';
import DomainsRecursive from '@/components/categories/Recursive.vue';
// import type { DomainInterface } from '~/interfaces/domains/domain.interface';

const breadcrumb = [{ label: 'Domenii', href: '/domains', icon: BookIcon }];
const options = [
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Completed', value: 'completed' },
];

// const pageNumber = ref(0);
// const pageSize = ref(10);
// const token = useCookie('firebaseToken');
// const { data: domains } = await useFetch<DomainInterface[]>(`/api/domain?pageNumber=${pageNumber.value}&pageSize=${pageSize.value}`, {
//     headers: {
//         Authorization: `Bearer ${token.value}`,
//     },
// });
const domains = [
    {
        _id: '6640cce35fbc8c0fd9f7ed05',
        uuid: 'c3d2573a-3fd2-43b8-81c3-c804c2d32341',
        createdBy: '663cb52cde9457dbecd7dc3d',
        deleted: false,
        name: 'My Awesome Project',
        icon: 'GavelIcon',
        description: 'This is a project I\'m excited about, aiming to develop a mobile application for...', // More specific description
        createdAt: '2024-05-12T14:06:27.570Z',
        updatedAt: '2024-05-12T14:06:27.570Z',
        __v: 0,
        items: [
            {
                _id: '6640d32a5fbc8c0fd9f7ed1a',
                uuid: 'dc07cd9b-92d8-472d-a755-f31047a9369b',
                createdBy: '663cb52cde9457dbecd7dc3d',
                deleted: false,
                name: 'First Steps',
                icon: 'Gem',
                description: 'Initial tasks to get started.',
                parentId: '6640cce35fbc8c0fd9f7ed05',
                settings: {
                    some: 'setting',
                },
                objectiveIds: [],
                authors: ['John Doe'],
                contributors: [],
                createdAt: '2024-05-12T14:33:14.156Z',
                updatedAt: '2024-05-12T14:33:14.156Z',
                __v: 0,
                items: [
                    {
                        _id: '6640db375fbc8c0fd9f7ed66',
                        uuid: '9c61c4b9-348d-408f-90e0-dc72c7e57700',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Set up development environment',
                        img: 'https://picsum.photos/200',
                        description: 'Install necessary tools and libraries.',
                        parentId: '6640d32a5fbc8c0fd9f7ed1a',
                        settings: {
                            aaaaa: 'test',
                        },
                        objectiveIds: [],
                        createdAt: '2024-05-12T15:07:35.321Z',
                        updatedAt: '2024-05-12T15:07:35.321Z',
                        __v: 0,
                    },
                    {
                        _id: '6640e2345fbc8c0fd9f7ed77',
                        uuid: '12f43dfe-a0ab-48b2-b987-e7b321c98912',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Create initial project structure',
                        img: 'https://picsum.photos/200',
                        description: 'Set up folders for source code, assets, etc.',
                        parentId: '6640d32a5fbc8c0fd9f7ed1a',
                        settings: {},
                        objectiveIds: [],
                        createdAt: '2024-05-13T10:21:16.453Z',
                        updatedAt: '2024-05-13T10:21:16.453Z',
                        __v: 0,
                    },
                ],
            },
            {
                _id: '6640e8b25fbc8c0fd9f7ed88',
                uuid: '4b98721c-1def-4f1e-a023-1caed234fbae',
                createdBy: '663cb52cde9457dbecd7dc3d',
                deleted: false,
                name: 'Develop Core Functionality',
                icon: 'Globe',
                description: 'Implement the main features of the application.',
                parentId: '6640cce35fbc8c0fd9f7ed05',
                settings: {},
                objectiveIds: [],
                authors: ['Jane Doe'], // Assign a different author
                contributors: [],
                createdAt: '2024-05-13T14:54:22.789Z',
                updatedAt: '2024-05-13T14:54:22.789Z',
                __v: 0,
                items: [
                    {
                        _id: '6640eb125fbc8c0fd9f7ed99',
                        uuid: '8732f1c9-bcab-4c29-a988-7f7ca2b3d121',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Design user interface (UI) mockups',
                        img: 'https://picsum.photos/200',
                        description: 'Create wireframes or prototypes to visualize the app\'s layout.',
                        parentId: '6640e8b25fbc8c0fd9f7ed88',
                        settings: {},
                        objectiveIds: [],
                        createdAt: '2024-05-13T15:12:34.102Z',
                        updatedAt: '2024-05-13T15:12:34.102Z',
                        __v: 0,
                    },
                    {
                        _id: '6640f08b5fbc8c0fd9f7eda0',
                        uuid: '2c19dfeb-312e-47e2-b782-d9b87c9f2ab1',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Develop core user flows',
                        img: 'https://picsum.photos/200',
                        description: 'Implement the essential functionalities of the app.',
                        parentId: '6640e8b25fbc8c0fd9f7ed88',
                        settings: {},
                        objectiveIds: [],
                        createdAt: '2024-05-13T16:23:15.433Z',
                        updatedAt: '2024-05-13T16:23:15.433Z',
                        __v: 0,
                    },
                ],
            },
            {
                _id: '6640e8b25fbc8c0fd9f7ed881',
                uuid: '4b98721c-1def-4f1e-a023-1caed234fbae1',
                createdBy: '663cb52cde9457dbecd7dc3d1',
                deleted: false,
                name: 'Develop App',
                img: 'https://picsum.photos/200',
                description: 'Implement the main features of the application.',
                parentId: '6640cce35fbc8c0fd9f7ed05',
                settings: {},
                objectiveIds: [],
                authors: ['Jane Doe'], // Assign a different author
                contributors: [],
                createdAt: '2024-05-13T14:54:22.789Z',
                updatedAt: '2024-05-13T14:54:22.789Z',
                __v: 0,
            },
        ],
    },
    {
        _id: '6640cce35fbc8c0fd9f7ed05',
        uuid: 'c3d2573a-3fd2-43b8-81c3-c804c2d32341',
        createdBy: '663cb52cde9457dbecd7dc3d',
        deleted: false,
        name: 'My Awesome Project 2',
        icon: 'GavelIcon',
        description: 'This is a project I\'m excited about, aiming to develop a mobile application for...', // More specific description
        createdAt: '2024-05-12T14:06:27.570Z',
        updatedAt: '2024-05-12T14:06:27.570Z',
        __v: 0,
        items: [
            {
                _id: '6640d32a5fbc8c0fd9f7ed1a',
                uuid: 'dc07cd9b-92d8-472d-a755-f31047a9369b',
                createdBy: '663cb52cde9457dbecd7dc3d',
                deleted: false,
                name: 'First Steps',
                icon: 'Gem',
                description: 'Initial tasks to get started.',
                parentId: '6640cce35fbc8c0fd9f7ed05',
                settings: {
                    some: 'setting',
                },
                objectiveIds: [],
                authors: ['John Doe'],
                contributors: [],
                createdAt: '2024-05-12T14:33:14.156Z',
                updatedAt: '2024-05-12T14:33:14.156Z',
                __v: 0,
                items: [
                    {
                        _id: '6640db375fbc8c0fd9f7ed66',
                        uuid: '9c61c4b9-348d-408f-90e0-dc72c7e57700',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Set up development environment',
                        img: 'https://picsum.photos/200',
                        description: 'Install necessary tools and libraries.',
                        parentId: '6640d32a5fbc8c0fd9f7ed1a',
                        settings: {
                            aaaaa: 'test',
                        },
                        objectiveIds: [],
                        createdAt: '2024-05-12T15:07:35.321Z',
                        updatedAt: '2024-05-12T15:07:35.321Z',
                        __v: 0,
                    },
                    {
                        _id: '6640e2345fbc8c0fd9f7ed77',
                        uuid: '12f43dfe-a0ab-48b2-b987-e7b321c98912',
                        createdBy: '663cb52cde9457dbecd7dc3d',
                        deleted: false,
                        name: 'Create initial project structure',
                        img: 'https://picsum.photos/200',
                        description: 'Set up folders for source code, assets, etc.',
                        parentId: '6640d32a5fbc8c0fd9f7ed1a',
                        settings: {},
                        objectiveIds: [],
                        createdAt: '2024-05-13T10:21:16.453Z',
                        updatedAt: '2024-05-13T10:21:16.453Z',
                        __v: 0,
                    },
                ],
            },
        ],
    },
];

const router = useRouter();

</script>

<template>
    <div class="flex flex-col w-full relative">
        <PageNavbar :breadcrumb="breadcrumb" />
        <section class="flex gap-5 self-stretch py-2 pr-5 pl-6 bg-white border-b border-gray-200 border-solid max-md:flex-wrap max-md:pl-5">
            <FacetedFilter title="Autori" :options="options" />
        </section>
        <section
            ref="scrollRef"
            class="flex flex-col gap-2 min-h-[calc(100vh-100px)] max-h-[calc(100vh-250px)] overflow-y-auto relative bg-dark-100 p-5"
        >
            <UiAccordion
                v-for="domain in domains"
                ref="target"
                :key="domain._id"
                type="single"
                class="w-full border-none flex flex-col gap-1 bg-white rounded-lg p-3"
                collapsible
            >
                <UiAccordionItem :value="domain.name" class="relative">
                    <div class="flex items-center gap-1">
                        <UiAccordionTrigger class="flex-row-reverse justify-center gap-2.5 py-1 truncate w-10 max-w-[50px] h-7" />
                        <section
                            class="w-full flex gap-2 items-center py-2 max-md:flex-wrap"
                        >
                            <article class="flex flex-1 gap-2 self-stretch rounded-lg bg-white bg-opacity-0 max-md:flex-wrap">
                                <figure class="flex justify-center items-center px-2.5 w-10 h-10 rounded-lg bg-light-300">
                                    <PlugIcon class="w-5 aspect-square stroke-1" />
                                </figure>
                                <p class="my-auto text-sm font-medium leading-4 text-zinc-700 max-md:max-w-full">{{ domain.name }}</p>
                            </article>
                            <aside class="flex items-center gap-2 self-stretch px-3 my-auto">
                              <div class="flex items-center gap-4 self-stretch px-3 my-auto">
                                    <MergeIcon class="w-5 h-5 text-slate-500" />
                                    <PencilLine class="w-5 h-5  text-slate-500" />
                                </div>
                            </aside>
                            <UiPopover>
                                <UiPopoverTrigger as-child>
                                    <UiButton variant="secondary" class="bg-dark-50" size="icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-ellipsis-vertical"
                                        >
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="12" cy="5" r="1" />
                                            <circle cx="12" cy="19" r="1" />
                                        </svg>
                                    </UiButton>
                                </UiPopoverTrigger>
                                <UiPopoverContent side="left" :collision-padding="10" class="w-fit flex flex-col items-start">
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <CopyIcon class="w-4 h-4" />
                                        Duplicate
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost">
                                        <MoveIcon class="w-4 h-4" />
                                        Move
                                    </UiButton>
                                    <UiButton class="gap-1" size="xs" variant="ghost" @click="router.push('/domains/create-file')">
                                        <Trash2Icon class="w-4 h-4" />
                                        Delete
                                    </UiButton>
                                </UiPopoverContent>
                            </UiPopover>
                        </section>
                    </div>
                    <UiAccordionContent class="pt-1 ml-4 pb-0 flex flex-col gap-1">
                        <component :is="DomainsRecursive" :items="domain.items" />
                    </UiAccordionContent>
                </UiAccordionItem>
            </UiAccordion>
        </section>
    </div>
</template>
