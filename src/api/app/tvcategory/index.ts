import request from '@/config/axios'

// 短剧分类 VO
export interface TvCategoryVO {
  id: string // 分类
  reviewStatus: number // 审核状态. -1: 审核未通过, 0: 待审核, 1: 审核中, 2: 审核通过
}

// 短剧分类 API
export const TvCategoryApi = {
  // 查询短剧分类分页
  getTvCategoryPage: async (params: any) => {
    return await request.get({ url: `/app/tv-category/page`, params })
  },

  // 查询短剧分类详情
  getTvCategory: async (id: number) => {
    return await request.get({ url: `/app/tv-category/get?id=` + id })
  },

  // 新增短剧分类
  createTvCategory: async (data: TvCategoryVO) => {
    return await request.post({ url: `/app/tv-category/create`, data })
  },

  // 修改短剧分类
  updateTvCategory: async (data: TvCategoryVO) => {
    return await request.put({ url: `/app/tv-category/update`, data })
  },

  // 删除短剧分类
  deleteTvCategory: async (id: number) => {
    return await request.delete({ url: `/app/tv-category/delete?id=` + id })
  },

  // 导出短剧分类 Excel
  exportTvCategory: async (params) => {
    return await request.download({ url: `/app/tv-category/export-excel`, params })
  },
}