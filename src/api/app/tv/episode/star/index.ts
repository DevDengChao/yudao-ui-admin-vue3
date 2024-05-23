import request from '@/config/axios'

// 用户剧集收藏关系 VO
export interface TvEpisodeStarVO {
  id: number // ID
  userId: number // 用户 id
  serialId: number // 集合 id
  episodeId: number // 剧集 id
}

// 用户剧集收藏关系 API
export const TvEpisodeStarApi = {
  // 查询用户剧集收藏关系分页
  getTvEpisodeStarPage: async (params: any) => {
    return await request.get({ url: `/app/tv-episode-star/page`, params })
  },

  // 查询用户剧集收藏关系详情
  getTvEpisodeStar: async (id: number) => {
    return await request.get({ url: `/app/tv-episode-star/get?id=` + id })
  },

  // 新增用户剧集收藏关系
  createTvEpisodeStar: async (data: TvEpisodeStarVO) => {
    return await request.post({ url: `/app/tv-episode-star/create`, data })
  },

  // 修改用户剧集收藏关系
  updateTvEpisodeStar: async (data: TvEpisodeStarVO) => {
    return await request.put({ url: `/app/tv-episode-star/update`, data })
  },

  // 删除用户剧集收藏关系
  deleteTvEpisodeStar: async (id: number) => {
    return await request.delete({ url: `/app/tv-episode-star/delete?id=` + id })
  },

  // 导出用户剧集收藏关系 Excel
  exportTvEpisodeStar: async (params) => {
    return await request.download({ url: `/app/tv-episode-star/export-excel`, params })
  },
}
