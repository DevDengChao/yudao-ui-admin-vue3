import request from '@/config/axios'

// 观看记录 VO
export interface WatchingHistoryVO {
  userId: number // 用户 ID
  serialId: number // 集合 ID
  episode: number // 最后观看到第几集
  seek: number // 最后观看到第几秒
}

// 观看记录 API
export const WatchingHistoryApi = {
  // 查询观看记录分页
  getWatchingHistoryPage: async (params: any) => {
    return await request.get({ url: `/app/watching-history/page`, params })
  },

  // 查询观看记录详情
  getWatchingHistory: async (id: number) => {
    return await request.get({ url: `/app/watching-history/get?id=` + id })
  },

  // 新增观看记录
  createWatchingHistory: async (data: WatchingHistoryVO) => {
    return await request.post({ url: `/app/watching-history/create`, data })
  },

  // 修改观看记录
  updateWatchingHistory: async (data: WatchingHistoryVO) => {
    return await request.put({ url: `/app/watching-history/update`, data })
  },

  // 删除观看记录
  deleteWatchingHistory: async (id: number) => {
    return await request.delete({ url: `/app/watching-history/delete?id=` + id })
  },

  // 导出观看记录 Excel
  exportWatchingHistory: async (params) => {
    return await request.download({ url: `/app/watching-history/export-excel`, params })
  },
}