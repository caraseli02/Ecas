import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCategories } from '@/composables/useCategories'

const isOpen = ref(false)

export function useCategoriesNavigation() {
  const { categories } = useCategories()

  const selectedCategories = ref<any[]>([])
  const currentCategory = computed(() =>
    selectedCategories.value.length > 0 ? selectedCategories.value[selectedCategories.value.length - 1] : null,
  )

  const router = useRouter()

  function onCategoryClick(category: any, makeReset: boolean) {
    if (makeReset) selectedCategories.value = []
    if (category.subcategory.length === 0) {
      isOpen.value = false
      selectedCategories.value = []
      router.push(`/search?category=${category.id}`)
    }
    else {      
      selectedCategories.value.push(category)
    }
  }

  function resetCategories() {
    selectedCategories.value = []
  }

  watch(isOpen, (isOpen) => {
    if (!isOpen) {
      selectedCategories.value = []
    }
  })

  return {
    categories,
    selectedCategories,
    currentCategory,
    isOpen,
    onCategoryClick,
    resetCategories,
  }
}
