<template>
  <div id="app">
    <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/"><h4>Vue Firebase</h4></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/chatbot"><img align="middle" class="ml-3 mr-2 mb-1" src="https://img.icons8.com/color/24/000000/bot.png">Chatbot</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tasks"><img align="middle" class="ml-3 mr-2 mb-1" src="https://img.icons8.com/color/24/000000/task.png">Tasks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/websites"><img align="middle" class="ml-3 mr-2 mb-1" src="https://img.icons8.com/color/24/000000/internet.png">Websites</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import config from './config.js'
firebase.initializeApp(config)

export default {
  
}
</script>

<style>
</style>