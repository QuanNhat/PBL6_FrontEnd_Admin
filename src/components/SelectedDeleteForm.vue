<template>
    <div v-if="showModal" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" @click="closeModal">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title }}</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">{{ message }}</p>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button @click="handleConfirm" type="button"
                        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 sm:ml-3 sm:w-auto sm:text-sm">
                        {{ confirmButtonText }}
                    </button>
                    <button @click="handleCancel" type="button"
                        class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 mt-2 sm:mt-0 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200 sm:w-auto sm:text-sm">
                        {{ cancelButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        showModal: Boolean,
        title: String,
        message: String,
        idCategory : String,
        confirmButtonText: {
            type: String,
            default: 'Confirm',
        },
        cancelButtonText: {
            type: String,
            default: 'Cancel',
        },
    },
    methods: {
        handleConfirm() {
            console.log(this.idCategory)
            this.$emit('confirm');
            this.closeModal();
        },
        handleCancel() {
            this.$emit('cancel');
            this.closeModal();
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
