import request from '@/config/axios'

// 短剧剧集 VO
export interface TvEpisodeVO {
  id: number // 剧集 id
  serialId: number // 合集 id
  episode: number // 集数
  name: string // 标题
  description: string // 描述
  cover: string // 封面
  reviewStatus: number // 审核状态. -1: 审核未通过, 0: 待审核, 1: 审核中, 2: 审核通过
  video: string // 视频地址
}

// 短剧剧集 API
export const TvEpisodeApi = {
  // 查询短剧剧集分页
  getTvEpisodePage: async (params: any) => {
    return await request.get({ url: `/app/tv-episode/page`, params })
  },

  // 查询短剧剧集详情
  getTvEpisode: async (id: number) => {
    return await request.get({ url: `/app/tv-episode/get?id=` + id })
  },

  // 新增短剧剧集
  createTvEpisode: async (data: TvEpisodeVO) => {
    return await request.post({ url: `/app/tv-episode/create`, data })
  },

  // 修改短剧剧集
  updateTvEpisode: async (data: TvEpisodeVO) => {
    return await request.put({ url: `/app/tv-episode/update`, data })
  },

  // 删除短剧剧集
  deleteTvEpisode: async (id: number) => {
    return await request.delete({ url: `/app/tv-episode/delete?id=` + id })
  },

  // 导出短剧剧集 Excel
  exportTvEpisode: async (params) => {
    return await request.download({ url: `/app/tv-episode/export-excel`, params })
  },
}