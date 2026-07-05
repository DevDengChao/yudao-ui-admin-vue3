<!-- 产品销售情况统计 -->
<template>
  <!-- 统计列表 -->
  <el-card shadow="never">
    <el-table v-loading="loading" :data="list" :show-overflow-tooltip="true">
      <el-table-column label="序号" align="center" type="index" width="80" fixed="left" />
      <el-table-column label="产品分类" align="center" prop="categoryName" min-width="140" />
      <el-table-column label="产品名称" align="center" prop="productName" min-width="180">
        <template #default="{ row }">
          <el-link :underline="false" type="primary" @click="openProduct(row.productId)">
            {{ row.productName }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="合同编号" align="center" prop="contractNo" min-width="160">
        <template #default="{ row }">
          <el-link :underline="false" type="primary" @click="openContract(row.contractId)">
            {{ row.contractNo }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="合同名称" align="center" prop="contractName" min-width="180" />
      <el-table-column label="负责人" align="center" prop="ownerUserName" min-width="120" />
      <el-table-column label="客户名称" align="center" prop="customerName" min-width="180">
        <template #default="{ row }">
          <el-link
            v-if="row.customerId"
            :underline="false"
            type="primary"
            @click="openCustomer(row.customerId)"
          >
            {{ row.customerName }}
          </el-link>
          <span v-else>{{ row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品单价（元）"
        align="right"
        prop="productPrice"
        min-width="140"
        :formatter="erpPriceTableColumnFormatter"
      />
      <el-table-column label="销售数量" align="right" prop="productCount" min-width="120" />
      <el-table-column
        label="销售金额（元）"
        align="right"
        prop="productTotalPrice"
        min-width="140"
        :formatter="erpPriceTableColumnFormatter"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import {
  CrmStatisticsProductSalesRespVO,
  StatisticsProductApi
} from '@/api/crm/statistics/product'
import { erpPriceTableColumnFormatter } from '@/utils'

defineOptions({ name: 'CrmStatisticsProductSalesList' })

const props = defineProps<{ queryParams: any }>() // 搜索参数

const { push } = useRouter()
const loading = ref(false) // 加载中
const list = ref<CrmStatisticsProductSalesRespVO[]>([]) // 列表的数据

/** 获取产品销售情况统计 */
const loadData = async () => {
  loading.value = true
  try {
    list.value = await StatisticsProductApi.getProductSalesList(props.queryParams)
  } finally {
    loading.value = false
  }
}

/** 打开合同详情 */
const openContract = (id: number) => {
  push({ name: 'CrmContractDetail', params: { id } })
}

/** 打开客户详情 */
const openCustomer = (id: number) => {
  push({ name: 'CrmCustomerDetail', params: { id } })
}

/** 打开产品详情 */
const openProduct = (id: number) => {
  push({ name: 'CrmProductDetail', params: { id } })
}

defineExpose({ loadData })

/** 初始化 */
onMounted(() => {
  loadData()
})
</script>
