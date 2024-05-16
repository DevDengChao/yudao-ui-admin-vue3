<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px">
      <el-table-column label="序号" type="index" width="100" />
       <el-table-column label="集数" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.episode`" :rules="formRules.episode" class="mb-0px!">
            <el-input v-model="row.episode" placeholder="请输入集数" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.name`" :rules="formRules.name" class="mb-0px!">
            <el-input v-model="row.name" placeholder="请输入标题" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="描述" min-width="400">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.description`" :rules="formRules.description" class="mb-0px!">
            <Editor v-model="row.description" height="150px" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="封面" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.cover`" :rules="formRules.cover" class="mb-0px!">
            <el-input v-model="row.cover" placeholder="请输入封面" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="审核状态. -1: 审核未通过, 0: 待审核, 1: 审核中, 2: 审核通过" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.reviewStatus`" :rules="formRules.reviewStatus" class="mb-0px!">
            <el-radio-group v-model="row.reviewStatus">
                <el-radio label="1">请选择字典生成</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="视频地址" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.video`" :rules="formRules.video" class="mb-0px!">
            <el-input v-model="row.video" placeholder="请输入视频地址" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="60">
        <template #default="{ $index }">
          <el-button @click="handleDelete($index)" link>—</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <el-row justify="center" class="mt-3">
    <el-button @click="handleAdd" round>+ 添加短剧剧集</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { TvSerialApi } from '@/api/app/tvserial'

const props = defineProps<{
  serialId: undefined // 合集 id（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formData = ref([])
const formRules = reactive({
  serialId: [{ required: true, message: '合集 id不能为空', trigger: 'blur' }],
  episode: [{ required: true, message: '集数不能为空', trigger: 'blur' }],
  video: [{ required: true, message: '视频地址不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.serialId,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await TvSerialApi.getTvEpisodeListBySerialId(val)
    } finally {
      formLoading.value = false
    }
  },
  { immediate: true }
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    id: undefined,
    serialId: undefined,
    episode: undefined,
    name: undefined,
    description: undefined,
    cover: undefined,
    reviewStatus: undefined,
    video: undefined,
  }
  row.serialId = props.serialId
  formData.value.push(row)
}

/** 删除按钮操作 */
const handleDelete = (index) => {
  formData.value.splice(index, 1)
}

/** 表单校验 */
const validate = () => {
  return formRef.value.validate()
}

/** 表单值 */
const getData = () => {
  return formData.value
}

defineExpose({ validate, getData })
</script>