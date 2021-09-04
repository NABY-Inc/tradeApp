var baseUrl = 'http://localhost/tradeApp/api/'
import axios from 'axios'
const state = {
    assets:[]
}
const mutations = {
    SET_ASSETS(state,data){
        state.assets = data
    }
}
const actions = {
    all({commit}){
        axios.get(baseUrl+'assets')
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