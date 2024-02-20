<script setup lang="ts">
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <UiAvatar class="h-9 w-9">
          <UiAvatarImage src="/UiAvatars/03.png" alt="@shadcn" />
          <UiAvatarFallback>SC</UiAvatarFallback>
        </UiAvatar>
      </Button>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="w-56" align="end">
      <UiDropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            shadcn
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            m@example.com
          </p>
        </div>
      </UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuGroup>
        <UiDropdownMenuItem>
          Profile
          <UiDropdownMenuShortcut>⇧⌘P</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          Billing
          <UiDropdownMenuShortcut>⌘B</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>
          Settings
          <UiDropdownMenuShortcut>⌘S</UiDropdownMenuShortcut>
        </UiDropdownMenuItem>
        <UiDropdownMenuItem>New Team</UiDropdownMenuItem>
      </UiDropdownMenuGroup>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem>
        Log out
        <UiDropdownMenuShortcut>⇧⌘Q</UiDropdownMenuShortcut>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
