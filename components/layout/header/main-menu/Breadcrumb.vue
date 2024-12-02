<script lang="ts" setup>

</script>

<template>
  <UiaBreadcrumb>
    <UiBreadcrumbList>
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/">
          Home
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger class="flex items-center gap-1">
            <UiBreadcrumbEllipsis class="h-4 w-4" />
            <span class="sr-only">Toggle menu</span>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="start">
            <UiDropdownMenuItem>Documentation</UiDropdownMenuItem>
            <UiDropdownMenuItem>Themes</UiDropdownMenuItem>
            <UiDropdownMenuItem>GitHub</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbLink href="/docs/components/accordion.html">
          Components
        </UiBreadcrumbLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <UiBreadcrumbPage>UiBreadcrumb</UiBreadcrumbPage>
      </UiBreadcrumbItem>
    </UiBreadcrumbList>
  </UiaBreadcrumb>
</template>
