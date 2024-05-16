import request from '@/config/axios'

// 短剧合集 VO
export interface TvSerialVO {
  id: number // 系列 id
  category: string // 类别
  name: string // 标题
  description: string // 描述
  cover: string // 封面
  episodeCount: number // 剧集数量
  reviewStatus: number // 审核状态. -1: 审核未通过, 0: 待审核, 1: 审核中, 2: 审核通过
  ended: boolean // 是否已完结
  director: string // 导演
  actors: string // 演员
}

// 短剧合集 API
export const TvSerialApi = {
  // 查询短剧合集分页
  getTvSerialPage: async (params: any) => {
    return await request.get({ url: `/app/tv-serial/page`, params })
  },

  // 查询短剧合集详情
  getTvSerial: async (id: number) => {
    return await request.get({ url: `/app/tv-serial/get?id=` + id })
  },

  // 新增短剧合集
  createTvSerial: async (data: TvSerialVO) => {
    return await request.post({ url: `/app/tv-serial/create`, data })
  },

  // 修改短剧合集
  updateTvSerial: async (data: TvSerialVO) => {
    return await request.put({ url: `/app/tv-serial/update`, data })
  },

  // 删除短剧合集
  deleteTvSerial: async (id: number) => {
    return await request.delete({ url: `/app/tv-serial/delete?id=` + id })
  },

  // 导出短剧合集 Excel
  exportTvSerial: async (params) => {
    return await request.download({ url: `/app/tv-serial/export-excel`, params })
  },

// ==================== 子表（短剧剧集） ====================

  // 获得短剧剧集列表
  getTvEpisodeListBySerialId: async (serialId) => {
    return await request.get({ url: `/app/tv-serial/tv-episode/list-by-serial-id?serialId=` + serialId })
  },
}