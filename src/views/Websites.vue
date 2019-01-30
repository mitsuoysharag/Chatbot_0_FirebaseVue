<template>
  <div class="websites">
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header">
              <h4>Add a Website</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="addWebsite">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Name" v-model="newWebsite.name" required>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Author" v-model="newWebsite.author" required>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Url" v-model="newWebsite.url" required>
                </div>
                <button class="btn btn-primary float-right">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h4>Websites List</h4>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Author</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in websitesPagination" :key="t.index">
                    <td><a :href="t.url" target="_blank">{{t.name}}</a></td>
                    <td>{{t.author}}</td>
                    <td class="td-min-width">
                      <a class="cursor-pointer mx-2" @click="deleteWebsite(t)"><img src="https://img.icons8.com/color/24/000000/trash.png"></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="websitesPagination.length == 0">
                <div class="m-3 text-center">Esta pagina no contiene datos</div>
              </div>
              <nav class="float-right">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" @click="pagination_active = 0">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li v-for="i in paginationPages" :key="i.index" class="page-item" :class="{active: pagination_active == i}">
                    <a href="#" class="page-link" @click="pagination_active = i">{{i+1}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" @click="pagination_active = paginationPages[paginationPages.length-1]">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import toastr from 'toastr'

let database = firebase.database()
let websitesRef = database.ref('websites') 

export default {
  name: 'websites',
  firebase: {
    websites: websitesRef
  },
  data() {
    return {
      newWebsite: {
        name: '',
        author: '',
        url: ''
      },
      pagination_step: 4,
      pagination_active: 0
    }
  },
  computed: {
    paginationPages() {
      let n = Math.ceil(this.websites.length / this.pagination_step)
      let paginationPag = Array.from(Array(n).keys())
      return paginationPag
    },
    websitesPagination() {
      let websitesPag = this.websites.slice(this.pagination_active*this.pagination_step,this.pagination_active*this.pagination_step + this.pagination_step)
      return websitesPag
    },

  },
  methods: {
    addWebsite() {
      websitesRef.push(this.newWebsite).then(() => {
        this.newWebsite.name = ''
        this.newWebsite.author = ''
        this.newWebsite.url = ''
        toastr.success('Website added')
      })
    },
    deleteWebsite(t) {
      if(confirm('Are you sure you want to delete it?')){
        websitesRef.child(t['.key']).remove().then(() => {
          toastr.success('Website deleted')
        })
      }
    }
  }
}
</script>

<style scoped>
.td-min-width {
  width: 1%; 
  white-space: nowrap
}
.cursor-pointer:hover {
  cursor: pointer
}
</style>