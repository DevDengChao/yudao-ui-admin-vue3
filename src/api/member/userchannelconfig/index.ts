import request from '@/config/axios'

// 会员用户渠道配置 VO
export interface UserChannelConfigVO {
  id: string // 渠道 ID
  cpaRemain: number // CPA 保留系数
  cpaBase: number // CPA 计数基数
}

// 会员用户渠道配置 API
export const UserChannelConfigApi = {
  // 查询会员用户渠道配置分页
  getUserChannelConfigPage: async (params: any) => {
    return await request.get({ url: `/member/user-channel-config/page`, params })
  },

  // 查询会员用户渠道配置详情
  getUserChannelConfig: async (id: number) => {
    return await request.get({ url: `/member/user-channel-config/get?id=` + id })
  },

  // 新增会员用户渠道配置
  createUserChannelConfig: async (data: UserChannelConfigVO) => {
    return await request.post({ url: `/member/user-channel-config/create`, data })
  },

  // 修改会员用户渠道配置
  updateUserChannelConfig: async (data: UserChannelConfigVO) => {
    return await request.put({ url: `/member/user-channel-config/update`, data })
  },

  // 删除会员用户渠道配置
  deleteUserChannelConfig: async (id: number) => {
    return await request.delete({ url: `/member/user-channel-config/delete?id=` + id })
  },

  // 导出会员用户渠道配置 Excel
  exportUserChannelConfig: async (params) => {
    return await request.download({ url: `/member/user-channel-config/export-excel`, params })
  },
}