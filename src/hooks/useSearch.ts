import { ref, nextTick, onActivated } from 'vue'
import { searchData, type VGame } from '../api/vndb'

export function useSearch() {
  const GList = ref<VGame[]>([])
  const loading = ref(false)
  const Centered = ref(true) 
  const Searched = ref(false) 
  const keyword = ref('')
  
  // 拿到瀑布流组件的实例
  const waterfallRef = ref<any>(null)

  // 刷新瀑布流布局的方法
  const refreshLayout = () => {
    nextTick(() => {
      waterfallRef.value?.renderer?.()
    })
  }

  // 页面激活时刷新布局
  onActivated(() => {
    if (GList.value.length > 0) {
      refreshLayout()
    }
  })

  const handleSearch = async () => {
    const queryStr = keyword.value.trim()
    if (!queryStr) return

    Centered.value = false
    loading.value = true
    Searched.value = false

    try {
      const query = {
        filters: ['search', '=', queryStr]
      }
      
      const response = await searchData(query)
      GList.value = response.results

      if (GList.value.length === 0) {
        Searched.value = true
      }

      // 刷新瀑布流
      refreshLayout()
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    GList,
    loading,
    Centered,
    Searched,
    keyword,
    waterfallRef,
    handleSearch,
    refreshLayout
  }
}