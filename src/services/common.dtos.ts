export interface PagineatedResponseDto<TItem> {
  items: TItem[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}
