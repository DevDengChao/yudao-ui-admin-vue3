import request from '@/config/axios'

// 用户剧集点赞关系 VO
export interface TvEpisodeUpvoteVO {
  id: number // ID
  userId: number // 用户 id
  serialId: number // 集合 id
  episodeId: number // 剧集 id
}

// 用户剧集点赞关系 API
export const TvEpisodeUpvoteApi = {
  // 查询用户剧集点赞关系分页
  getTvEpisodeUpvotePage: async (params: any) => {
    return await request.get({ url: `/app/tv-episode-upvote/page`, params })
  },

  // 查询用户剧集点赞关系详情
  getTvEpisodeUpvote: async (id: number) => {
    return await request.get({ url: `/app/tv-episode-upvote/get?id=` + id })
  },

  // 新增用户剧集点赞关系
  createTvEpisodeUpvote: async (data: TvEpisodeUpvoteVO) => {
    return await request.post({ url: `/app/tv-episode-upvote/create`, data })
  },

  // 修改用户剧集点赞关系
  updateTvEpisodeUpvote: async (data: TvEpisodeUpvoteVO) => {
    return await request.put({ url: `/app/tv-episode-upvote/update`, data })
  },

  // 删除用户剧集点赞关系
  deleteTvEpisodeUpvote: async (id: number) => {
    return await request.delete({ url: `/app/tv-episode-upvote/delete?id=` + id })
  },

  // 导出用户剧集点赞关系 Excel
  exportTvEpisodeUpvote: async (params) => {
    return await request.download({ url: `/app/tv-episode-upvote/export-excel`, params })
  },
}