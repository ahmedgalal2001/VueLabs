<template>
  <div class="grid grid-cols-3 gap-6 m-2">
    <ProductCompoent
      @delete-product="deleteProduct"
      @edit-product="openModalEdit"
      v-for="product in products"
      :key="product.id"
      :product="product"
    />

    <button
      @click="openModalAdd"
      type="button"
      class="text-white fixed bottom-5 right-5 focus:ring-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      +
    </button>

    <ModalEdit
      v-if="isModalEditVisible"
      :visible="isModalEditVisible"
      :product="product"
      @product-edited="getProducts"
      @close-edit="closeModalEdit"
    />

    <ModalAdd
      :visible="isModalAddVisible"
      @product-added="getProducts"
      @close-add="closeModalAdd"
    />
  </div>
</template>

<script>
import ProductCompoent from "../components/ProductCompoent.vue";
import ModalAdd from "../components/ModalAdd.vue";
import ModalEdit from "../components/ModalEdit.vue";
export default {
  name: "ProductsView",
  components: { ProductCompoent, ModalAdd, ModalEdit },
  data: function () {
    return {
      products: [],
      isModalAddVisible: false,
      isModalEditVisible: false,
      product: {},
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
    openModalAdd() {
      this.isModalAddVisible = true; // Method to open the modal
    },
    closeModalAdd() {
      this.isModalAddVisible = false; // Method to close the modal
    },
    openModalEdit(id) {
      this.$axios.get(`/products/${id}`).then((res) => {
        this.product = res.data;
        this.isModalEditVisible = true; // Method to open the modal
      });
    },
    closeModalEdit() {
      this.isModalEditVisible = false; // Method to close the modal
    },
  },

  mounted() {
    this.getProducts();
  },
  beforeCreate() {},
};
</script>

<style scope></style>
