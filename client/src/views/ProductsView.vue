<template>
  <div class="grid grid-cols-3 gap-6 m-2">
    <ProductCompoent
      @delete-product="deleteProduct"
      v-for="product in products"
      :key="product.id"
      :product="product"
    />

    <button
      @click="openModal"
      type="button"
      class="text-white fixed bottom-5 right-5 focus:ring-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      +
    </button>

    <ModalAdd
      :visible="isModalVisible"
      @product-added="getProducts"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ProductCompoent from "../components/ProductCompoent.vue";
import ModalAdd from "../components/ModalAdd.vue";
export default {
  name: "ProductsView",
  components: { ProductCompoent, ModalAdd },
  data: function () {
    return {
      products: [],
      isModalVisible: false,
    };
  },
  methods: {
    deleteProduct(id) {
      this.$axios.delete(`/products/${id}`).then((res) => {
        console.log(res.data);
        this.getProducts();
      });
    },
    getProducts() {
      this.$axios.get("/products").then((res) => {
        this.products = res.data;
      });
    },
    openModal() {
      this.isModalVisible = true; // Method to open the modal
    },
    closeModal() {
      this.isModalVisible = false; // Method to close the modal
    },
  },

  mounted() {
    this.getProducts();
  },
  beforeCreate() {},
};
</script>

<style scope></style>
