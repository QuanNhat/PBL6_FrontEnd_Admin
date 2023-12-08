<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Category</h3>
    <div class="overflow-x-auto relative  sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Category Id
            </th>
            <th scope="col" class="py-3 px-6">
              <div class="flex items-center">
                name
                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="ml-1 w-3 h-3" aria-hidden="true"
                    fill="currentColor" viewBox="0 0 320 512">
                    <path
                      d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z">
                    </path>
                  </svg></a>
              </div>
            </th>

              <th scope="col" class="py-3 px-6">
                <span class="sr-only">Edit</span>
              </th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(item, index) in categoryList[0]" :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="py-4 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ item._id }}
            </th>
            
            <td class="py-4 px-4">
              {{ item.name }}
            </td>
            <td class="py-4 px-6 text-right">
              <a
              @click="openEditModal(item)"  
              href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2">Edit</a>
              <a
              @click="openModal(item._id)" 
              href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
              
            </td>
          </tr>
        </tbody>
      </table>      
    </div>
    <div v-if="editModalVisible" class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" @click="closeEditModal">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Category</h3>
              </div>
              <div>
      <!-- Nút mở modal -->

      <!-- Modal component -->
      
    </div>

  <form @submit.prevent="submitForm">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Edit Category</h3>
            <!-- Name Input -->
            <div class="mt-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="selectedCategory.name" type="text" id="name" name="name" class="mt-1 p-2 w-full border rounded-md">
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6">
    <div class="flex justify-end">
      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full mx-2 sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 sm:ml-3 sm:text-sm"
      >
        Submit
      </button>

      <!-- Close Button -->
      <button
        type="button"
        @click="closeEditModal"
        class="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mt-2 sm:mt-0 bg-gray-300 text-base font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 sm:text-sm"
      >
        Close
      </button>
    </div>
  </div>
  </form>
              </div>
            </div>
          </div>
        </div>
        <selected-delete-form
          :showModal="modalVisible"
          :idCategory = "idCategory"
          title="Confirmation"
          message="Do you want to proceed?"
          @confirm="handleConfirm"
          @cancel="handleCancel"
          @close="closeModal"
        ></selected-delete-form>
</template>

               
      
<script>
import { API } from '@/api';
import SelectedDeleteForm from '@/components/SelectedDeleteForm.vue'
export default {
  components : {
    SelectedDeleteForm
  },
  data() {
    return {
      categoryList: [],
      editModalVisible: false,
      selectedCategory: null,
      currentCategory : null,
      modalVisible: false,
      idCategory :  null

    };
  },
  mounted() {
    API.getAllCategory().then(response => {
      this.categoryList.push(response.data.data)
    });
  },
  methods: {
    openModal(id) {
      this.idCategory = id;
      this.modalVisible = true;
    },
    handleConfirm() {
      // Xử lý khi người dùng nhấn Confirm
      console.log('Confirmed');
       API.deleteCategories(this.idCategory).then(res => {
        console.log(res)
        API.getAllCategory().then(response => {
          this.categoryList = [];
          this.categoryList.push(response.data.data)
        });
      })
    },
    handleCancel() {
      // Xử lý khi người dùng nhấn Cancel
      console.log('Cancelled');
    },
    closeModal() {
      this.modalVisible = false;
    },

    openEditModal(category) {
      this.selectedCategory = category;
      this.editModalVisible = true;
      document.body.style.overflow = 'hidden'; // Optional: Disable scrolling when the modal is open
    },
    closeEditModal() {
      this.selectedCategory = null;
      this.editModalVisible = false;
      document.body.style.overflow = ''; // Optional: Enable scrolling when the modal is closed
    },
    submitForm() {
      console.log('Submitted Data:', this.selectedCategory);
      API.updateCategories(this.selectedCategory._id,{
        name : this.selectedCategory.name}).then( res => {
          console.log(res)
          API.getAllCategory().then(response => {
          this.categoryList = [];
          this.categoryList.push(response.data.data)
        });
        })
      

      this.selectedCategory = null;
      this.editModalVisible = false;
      document.body.style.overflow = '';
    },
  },
  handleDeleteCategory() {
  }
}

</script>
