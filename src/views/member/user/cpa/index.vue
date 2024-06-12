<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      ref="queryFormRef"
      :inline="true"
      :model="queryParams"
      class="-mb-15px"
      label-width="68px"
    >
      <el-form-item label="渠道" prop="channel">
        <el-select
          v-model="queryParams.channel"
          class="!w-240px"
          clearable
          filterable
          placeholder="请输入渠道 ID"
          @keyup.enter="handleQuery"
        >
          <el-option
            v-for="channel in channels"
            :key="channel"
            :value="channel === 'all' ? '' : channel"
            :label="channel === 'all' ? '全部渠道' : channel"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="起止时间" prop="from">
        <el-date-picker
          v-model="queryParams.createTime"
          :default-time="defaultDateRange"
          class="!w-240px"
          end-placeholder="结束日期"
          start-placeholder="开始日期"
          type="daterange"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item>
        <el-button @click="handleQuery">
          <Icon class="mr-5px" icon="ep:search" />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon class="mr-5px" icon="ep:refresh" />
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table
      v-loading="loading"
      :data="list"
      :show-overflow-tooltip="true"
      :stripe="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="日期" prop="date" width="120px" />
      <el-table-column align="center" label="渠道" prop="channel" width="120px" />
      <el-table-column align="center" label="注册数量" prop="cpaCount" />
      <el-table-column
        align="center"
        label="实际注册数量"
        prop="count"
        v-hasPermi="['member:user:cpa:query:all']"
      />
    </el-table>
    <!-- 分页 -->
    <Pagination
      v-model:limit="queryParams.pageSize"
      v-model:page="queryParams.pageNo"
      :total="total"
      @pagination="getList"
    />
  </ContentWrap>
</template>
<script lang="ts" setup>
import * as UserApi from '@/api/member/user'

defineOptions({ name: 'MemberUserCpa' })

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const channels = ref<string[]>([]) // 列表的数据
const aDay = 24 * 60 * 60 * 1000
const now = Date.now()
const defaultDateRange = [new Date(now - 7 * aDay), new Date(now + aDay)]
const queryParams = reactive<{
  pageNo: number
  pageSize: number
  channel: string | null
  createTime: Date[]
}>({
  pageNo: 1,
  pageSize: 10,
  channel: null,
  createTime: defaultDateRange
})
const queryFormRef = ref() // 搜索的表单
const selectedIds = ref<number[]>([]) // 表格的选中 ID 数组

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await UserApi.getUserCpaPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const getChannels = async () => {
  channels.value = await UserApi.getUserCpaChannels()
  autoSelectFirstChannel()
}

const autoSelectFirstChannel = () => {
  if (!channels.value.length) return
  if (channels.value.includes('all')) {
    queryParams.channel = ''
  } else {
    queryParams.channel = channels.value[0]
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  autoSelectFirstChannel()
  queryParams.createTime = defaultDateRange
  handleQuery()
}

/** 表格选中事件 */
const handleSelectionChange = (rows: UserApi.UserVO[]) => {
  selectedIds.value = rows.map((row) => row.id)
}

/** 初始化 **/
onMounted(() => {
  getChannels()
  getList()
})
</script>
