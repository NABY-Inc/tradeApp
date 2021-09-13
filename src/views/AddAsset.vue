<template>
  <div class="bg-white mt-10 p-4 overflow-hidden shadow-md">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-6">
        <label for="">Select Instrument to Add</label>
        <select class="mt-1 block w-full focus:ring-indigo-300 focus:border-indigo-300 border-gray-300 rounded-md" v-model="selectedInstrument">
          <option value="null" disabled selected>--Select instrument--</option>
          <option v-for="instrument in instruments" :key="instrument.id" :value="instrument.id">{{instrument.name}}</option>
        </select>
      </div>
      <div class="col-span-6">
        <label for="">Enter Asset Name</label>
        <input type="text" class="mt-1 block w-full focus:ring-indigo-300 focus:border-indigo-300 border-gray-300 rounded-md" v-model="asset">
      </div>
      <div class="col-span-6">
        <label for="">Enter Asset Abbreviation</label>
        <input type="text" class="mt-1 block w-full focus:ring-indigo-300 focus:border-indigo-300 border-gray-300 rounded-md" v-model="abbr">
      </div>
      <div class="col-span-6">
        <label for="">Enter Minimum Lot Size</label>
        <input type="number" class="mt-1 block w-full focus:ring-indigo-300 focus:border-indigo-300 border-gray-300 rounded-md" v-model="lot">
      </div>
      <div class="col-span-6">
      <button @click="createAsset()" v-if="!isSaving" class="p-2 bg-blue-800 text-white rounded-md  border-gray-300 shadow-md">
        Save Asset
      </button>
      <button v-else class="p-2 bg-blue-300 text-white rounded shadow-md" disabled>
        please wait...
      </button>
        <span v-if="error" class="text-red-500 text-sm ml-3">All Fields Required!</span>
        <span v-if="success" class="text-green-500 text-sm ml-3">Asset Created!</span>
      </div>
    </div>
  </div>    
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
      error:false,
      success:false,
      isSaving:false,
      selectedInstrument:null,
      asset:null,
      abbr:null,
      lot:null,
    }
  },

  created(){
    this.$store.dispatch('assets/allInstruments')
  },

  computed:{
    ...mapState('assets',['instruments']),
  },

  watch:{
    error(){
      if (this.error) {
        setTimeout(() => {
          this.error = false
        }, 5000);
      }
    },
    success(){
      if (this.success) {
        setTimeout(() => {
          this.success = false
        }, 5000);
      }
    },
  },

  methods:{
    createAsset(){
      this.error = false
      this.success = false
      this.isSaving = true
      if (!this.selectedInstrument || !this.asset || !this.abbr || !this.lot) {
        this.error = true
        this.isSaving = false
      } else {
        this.$store.dispatch('assets/create',{
          trade_instrument_id:this.selectedInstrument, name:this.asset, abbreviation:this.abbr, lot_size:this.lot
          }).then(()=>{
          this.isSaving = false
          this.success = true
          this.selectedInstrument = null
          this.asset = null
          this.abbr = null
          this.lot = null
        })
      }
    }
  }
}
</script>
