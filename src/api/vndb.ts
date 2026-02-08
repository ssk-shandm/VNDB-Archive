export const api_url = 'https://api.vndb.org/kana/vn'

// 所有字段
export const VN_FIELDS = [
  'title',
  'released',
  'rating',
  'image.url',
  'image.sexual',
  'image.dims',
  'description',
  'developers.name',
  'languages',
  'tags.name', 
  'tags.rating', 
  'tags.id', 
  'relations.id',
  'relations.relation',
  'relations.title',
  'relations.relation_official',
  'relations.image.url',
  'relations.image.sexual',
  'relations.image.dims'
].join(', ')

/**
 * 部分内容定义
 */
// 图片
export interface VImage {
  id: string
  url: string
  sexual: number
  dims: [number, number]
}

// 标签
export interface VTag {
  id: string
  name: string
  rating: number
}

// 关联游戏
export interface VGameRelation {
  id: string
  relation: string
  relation_official: boolean
  title: string
  image?: VImage
}

// 开发者
export interface VDeveloper {
  id: string
  name: string
}

// 游戏信息
export interface VGame {
  id: number
  title: string
  languages: string[]
  released?: string
  tags?: VTag[]
  relations?: VGameRelation[]
  rating?: number
  image?: VImage
  description?: string
  developers?: VDeveloper[]
}

/**
 * 接口定义
 */
// 输出数据
export interface VQuery {
  filters: Array<any>
  fields?: string
}

// 输入数据
export interface VResponse {
  results: VGame[]
  count?: number
  more: boolean
}

/**
 * 发送请求
 */
export async function searchData(query: VQuery): Promise<VResponse> {
  const body = {
    ...query,
    fields: query.fields || VN_FIELDS
  }

  const response = await fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}
