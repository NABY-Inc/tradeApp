var baseUrl = 'https://trade-sizing-app-api.herokuapp.com/api/'
// var baseUrl = 'http://localhost/tradeApp-api/public/api/'
import axios from 'axios'
const state = {
    assets:[],
    instruments:[]
}
const mutations = {
    SET_ASSETS(state,data){
        state.assets = data
    },
    SET_INSTRUMENTS(state,data){
        state.instruments = data
    }
}
const actions = {
    allInstruments({commit}){
        axios.get(baseUrl+'instruments')
        .then((response)=>{
            commit('SET_INSTRUMENTS',response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    all({commit}){
        axios.get(baseUrl+'assets')
        .then((response)=>{
            commit('SET_ASSETS',response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },
    async create({commit}, data){
        await axios.post(baseUrl+'assets/create',data)
        .then((response)=>{
            commit('SET_ASSETS',response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}
const getters = {
    
}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}