<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/components/Login.vue -->

<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <h2 class="text-2xl font-semibold mb-4">Đăng Nhập</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="username" class="block text-sm font-medium text-gray-600">Tên đăng nhập</label>
                    <input v-model="username" type="text" id="username" name="username"
                        class="mt-1 p-2 w-full border rounded-md">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-600">Mật khẩu</label>
                    <input v-model="password" type="password" id="password" name="password"
                        class="mt-1 p-2 w-full border rounded-md">
                </div>
                <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Đăng Nhập</button>
            </form>
        </div>
    </div>
</template>

<script>
import { API } from '@/api';
export default {
    data() {
        return {
            username: '',
            password: '',
            account_info : null,
        };
    },
    methods: {
        login() {
            const token = localStorage.getItem("account_info")
            console.log(token);
            // Xử lý logic đăng nhập ở đây
            console.log('Đăng nhập với:', this.username, this.password);
            
            API.login({
                email : this.username,
                password : this.password
            }).then(res => {
                console.log(res.data.data.user.roles)
                if(res.data.data.user.roles.includes('Admin')){
                        this.account_info = res.data.data.access_token
                    localStorage.setItem('account_info', this.account_info);
                    this.$router.push('products')
                } else{
                alert('bạn không phải admin')
                }
            }).catch(err => {
                alert('có lỗi xảy ra',err)
            })
            
        }
    }
}
</script>

<style scoped>

</style>
