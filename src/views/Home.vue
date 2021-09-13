<template>
<div>
  <div class="mt-10 flex flex-row">
    <div class="bg-red-200 flex-1 shadow rounded p-5 mr-2">
      <h1>Loss Amount: <span class="pl-3 font-bold"> - $ {{loss}}</span></h1>
      <p class="pt-2">Approximately: <span class="pl-3 font-semibold"> - $ {{Math.round(loss)}}</span></p>
    </div>
    <div class="bg-green-100 flex-1 shadow rounded p-5">
      <h1>Profit Amount: <span class="pl-3 font-bold">$ {{profit}}</span></h1>
      <p class="pt-2">Approximately: <span class="pl-3 font-semibold">$ {{Math.round(profit)}}</span></p>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>

  <div class="bg-white rounded mt-10 p-4 shadow overflow-hidden">
    <form action="">
      <div class="grid grid-cols-6 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Choose Asset</label>
          <select id="country" name="country" autocomplete="country" @change="findLot()" v-model="selectedAsset" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option selected value="" disabled>Select an option</option>
            <option v-for="asset in assets" :key="asset.id" :value="asset.id">{{asset.name}}</option>
          </select>
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Lot Size</label>
          <input type="text" v-model="originalLotSize" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm bg-gray-200 border-gray-300 rounded-md" disabled>
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Enter Loss Points</label>
          <input type="text" v-model="lossPoint" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Enter Profit Points</label>
          <input type="text" v-model="profitPoint" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Double lot size here</label>
          <input type="number" v-model="lotSize" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="col-span-6 sm:col-span-3">
          <label for="asset" class="block text-sm font-medium text-gray-700">Risk ratio</label>
          <input type="text" v-model="ratio" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 bg-gray-200 rounded-md" disabled>
        </div>
      </div>
    </form>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    
  },

  data(){
    return{
      selectedAsset:null,
      lotSize:null,
      originalLotSize:null,
      lossPoint:0,
      profitPoint:0,
      doubleBy:1,
      increaseBy:0,
    }
  },

  created(){
    this.$store.dispatch('assets/all')
  },

  watch:{
    assets(assets){
      return assets;
    }
  },

  computed:{
    ...mapState('assets',['assets']),
    loss(){
      return (this.lossPoint * this.lotSize).toFixed(2)
    },
    profit(){
      return (this.profitPoint * this.lotSize).toFixed(2)
    },
    ratio(){
      return 'N/A'
    }
  },
  
  methods:{
    findLot(){
      var asset = this.assets.find(asset => asset.id == this.selectedAsset)
      this.lotSize = asset.lot_size
      this.originalLotSize = asset.lot_size
      this.lossPoint = 0
      this.profitPoint = 0
    },
    doubleLot(){
      if (this.doubleBy == 1) {
        this.findLot()
      } else {
        this.lotSize = this.originalLotSize * this.doubleBy
      }
    },

    increaseLot(){
      if (this.increaseBy == 0) {
        this.doubleLot()
      } else {
        this.lotSize = this.lotSize + this.increaseBy
      }
    }

  }

}
</script>
