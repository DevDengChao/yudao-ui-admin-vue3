<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="类别" prop="category">
        <el-input v-model="formData.category" placeholder="请输入类别" />
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="formData.name" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <Editor v-model="formData.description" height="150px" />
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input v-model="formData.cover" placeholder="请输入封面" />
      </el-form-item>
      <el-form-item label="剧集数量" prop="episodeCount">
        <el-input v-model="formData.episodeCount" placeholder="请输入剧集数量" />
      </el-form-item>
      <el-form-item label="审核状态. -1: 审核未通过, 0: 待审核, 1: 审核中, 2: 审核通过" prop="reviewStatus">
        <el-radio-group v-model="formData.reviewStatus">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否已完结" prop="ended">
        <el-radio-group v-model="formData.ended">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="导演" prop="director">
        <el-input v-model="formData.director" placeholder="请输入导演" />
      </el-form-item>
      <el-form-item label="演员" prop="actors">
        <el-input v-model="formData.actors" placeholder="请输入演员" />
      </el-form-item>
    </el-form>
    <!-- 子表的表单 -->
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="短剧剧集" name="tvEpisode">
        <TvEpisodeForm ref="tvEpisodeFormRef" :serial-id="formData.id" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { TvSerialApi, TvSerialVO } from '@/api/app/tvserial'
import TvEpisodeForm from './components/TvEpisodeForm.vue'

/** 短剧合集 表单 */
defineOptions({ name: 'TvSerialForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  category: undefined,
  name: undefined,
  description: undefined,
  cover: undefined,
  episodeCount: undefined,
  reviewStatus: undefined,
  ended: undefined,
  director: undefined,
  actors: undefined,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 子表的表单 */
const subTabsName = ref('tvEpisode')
const tvEpisodeFormRef = ref()

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await TvSerialApi.getTvSerial(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 校验子表单
  try {
    await tvEpisodeFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'tvEpisode'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as TvSerialVO
    // 拼接子表的数据
    data.tvEpisodes = tvEpisodeFormRef.value.getData()
    if (formType.value === 'create') {
      await TvSerialApi.createTvSerial(data)
      message.success(t('common.createSuccess'))
    } else {
      await TvSerialApi.updateTvSerial(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    category: undefined,
    name: undefined,
    description: undefined,
    cover: undefined,
    episodeCount: undefined,
    reviewStatus: undefined,
    ended: undefined,
    director: undefined,
    actors: undefined,
  }
  formRef.value?.resetFields()
}
</script>