<template>
  <div class="tasks">
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header">
              <h4>Add a Task</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Title" v-model="newTask.title" required>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Description" v-model="newTask.description" required>
                </div>
                <button class="btn btn-primary float-right">Add</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <h4>Tasks List</h4>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>State</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in tasksPagination" :key="t.index" :class="{'bg-green':t.state, 'bg-red':!t.state}">
                    <td>{{t.title}}</td>
                    <td>{{t.description}}</td>
                    <td v-if="t.state"><img src="https://img.icons8.com/color/24/000000/ok.png"></td>
                    <td v-else><img src="https://img.icons8.com/color/24/000000/cancel.png"></td>
                    <td class="td-min-width">
                      <a class="cursor-pointer mx-2" @click="changeStateTask(t)"><img src="https://img.icons8.com/color/24/000000/change.png"></a>
                      <a class="cursor-pointer mx-2" @click="deleteTask(t)"><img src="https://img.icons8.com/color/24/000000/trash.png"></a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="tasksPagination.length == 0">
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
let tasksRef = database.ref('tasks') 

export default {
  name: 'tasks',
  firebase: {
    tasks: tasksRef
  },
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        state: false
      },
      pagination_step: 4,
      pagination_active: 0
    }
  },
  computed: {
    paginationPages() {
      let n = Math.ceil(this.tasks.length / this.pagination_step)
      let paginationPag = Array.from(Array(n).keys())
      return paginationPag
    },
    tasksPagination() {
      let tasksPag = this.tasks.slice(this.pagination_active*this.pagination_step,this.pagination_active*this.pagination_step + this.pagination_step)
      return tasksPag
    },

  },
  methods: {
    addTask() {
      tasksRef.push(this.newTask).then(() => {
        this.newTask.title = ''
        this.newTask.description = ''
        this.newTask.state = false
        toastr.success('Task added')
      })
    },
    deleteTask(t) {
      if(confirm('Are you sure you want to delete it?')){
        tasksRef.child(t['.key']).remove().then(() => {
          toastr.success('Task deleted')
        })
      }
    },
    changeStateTask(t) {
      let newState = t.state ? false : true
      tasksRef.child(t['.key']).child('state').set(newState).then(() => {
        toastr.success('Task changed')
      })
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
.bg-green {
  background-color: #e0ffd9 !important
}
.bg-red {
  background-color: #fbe6e6 !important
}
</style>