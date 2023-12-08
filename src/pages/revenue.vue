<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Doanh thu PayPal Sandbox</h1>
    <button @click="getRevenue">Lấy doanh thu</button>
    <div v-if="revenue">
      <h2>Doanh thu: {{ revenue }}</h2>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
  <selected-delete-form
    :showModal="modalVisible"
    :idCategory="idCategory"
    title="Confirmation"
    message="Do you want to proceed?"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="closeModal"
  ></selected-delete-form>
</template>

<script>
import SelectedDeleteForm from "@/components/SelectedDeleteForm.vue"
import axios from "axios"
export default {
  components: {
    SelectedDeleteForm,
  },
  data() {
    return {
      revenue: null,
      clientId:
        "AXlfyJ2QROzOTSv_v9dNbFStavQmkh0HAhaVSB7cTJARukMq30pIKUUGuHrw1mMPu7zrHqj4LuKYjXrT",
      secret:
        "EBCETZLinOu6WmXmaftNbNX5GUXIWHDDDDkQrhJ_Orqa4pSwVyroWCZ3BU80F6ZtlP9Zo2_Nk75JS_Zz",
    }
  },
  methods: {
    async getRevenue() {
      try {
        // const auth = btoa(`${this.clientId}:${this.secret}`)

        console.log("Sending token request...")
        // const response = await axios.post(
        //   "https://api.sandbox.paypal.com/v1/oauth2/token",
        //   "grant_type=client_credentials",
        //   {
        //     headers: {
        //       Authorization: `Basic ${auth}`,
        //       "Content-Type": "application/x-www-form-urlencoded",
        //       Accept: "*/*",
        //       "Accept-Encoding": "gzip, deflate, br",
        //       Connection: "keep-alive",
        //     },
        //   }
        // )

        const accessToken =
          "A21AALrddXeknoxnymtp0ZNYW9BeXlatSXwFj6RvRFrESxfUDpMWjS4R_QQvTlOK5XnY4GnhNFIHESpnEWvl6X9H_dBHndzZA"

        console.log("Sending revenue request...")
        const paymentResponse = await axios.get(
          "https://api-m.sandbox.paypal.com/v1/reporting/transactions?start_date=2023-11-8T00:00:00-0700&end_date=2023-12-7T23:59:59-0700",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )

        const totalRevenue = paymentResponse.data.transaction_details
        this.revenue = totalRevenue.map((item, index) => {
          return { id: index, info: item.transaction_info }
        })
        console.log("revenue", this.revenue)
      } catch (error) {
        console.error("Error fetching revenue:", error)
        console.log("Response:", error.response)

        // console.log("Request data:", error.config.data)
      }
    },
  },
  //   handleDeleteCategory() {},
}
</script>
