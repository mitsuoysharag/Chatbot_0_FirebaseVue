<template>
  <div class="chatbot container">
    <div class="row">
      <div class="col-md-7 mx-auto my-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Chatbot</h4>
            <hr>
            <div
              id="chat_window"
              class="p-3 mb-2"
            >
              <div v-for="line in conversation" :key="line.index">
                <span v-if="line[0] == 'user'" class="msg-user">
                  <strong>Tú:</strong>
                  {{ line[1] }}
                </span>
                <span v-if="line[0] == 'chatbot'" class="msg-bot">
                  <strong>Chatbot:</strong>
                  {{ line[1] }}
                </span>
              </div>
            </div>
            <hr>
            <form v-on:submit.prevent="sendMessage">
              <div class="form-group">
                <div class="d-flex mb-2">
                  <label for="txtMessage">Escribe tu mensaje</label>
                  <sync-loader class="ml-3" :loading="loading" size="10px"></sync-loader>
                </div>
                <input id="txtMessage" type="text" class="form-control" placeholder="Mensaje" v-model="message" required>
              </div>
              <button class="btn btn-primary float-right">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";

export default {
  name: "chatbot",
  components: {
    SyncLoader
  },
  data() {
    return {
      conversation: [],
      message: "",
      send: true, //Evita acumulación de peticiones
      loading: false
    };
  },
  methods: {
    sendMessage() {
      if (this.send) {
        let msg = this.message;
        this.message = "";

        this.send = false;
        this.loading = true;
        this.conversation.push(["user", msg]);
        setTimeout(() => {
          this.scrollBottom()
        }, 10);
        
        // fetch("http://127.0.0.1:5000/chatbot/" + this.message)
        fetch("https://chatbotflasknltktensorflow.herokuapp.com/chatbot/" + msg)
          .then(response => response.json())
          .then(myJson => {
            this.send = true;
            this.loading = false;
            this.conversation.push(["chatbot", myJson.message]);
            setTimeout(() => {
              this.scrollBottom()
            }, 10);
          });
      }
    },
    scrollBottom() {
      let chat_window = document.getElementById("chat_window");
      chat_window.scrollTop = chat_window.scrollHeight;
    }
  }
};
</script>

<style scoped>
#chat_window {
  background: #ddd; 
  border-radius: 5px; 
  height: 300px; 
  overflow-y: scroll
}
.msg-user {
  color:cadetblue
}
.msg-bot {
  color:cornflowerblue
}
</style>


// <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
// <grid-loader :loading="loading" :color="color" :size="size"></grid-loader>
// <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
// <rise-loader :loading="loading" :color="color" :size="size"></rise-loader>
// <beat-loader :loading="loading" :color="color" :size="size"></beat-loader>
// <sync-loader :loading="loading" :color="color" :size="size"></sync-loader>
// <rotate-loader :loading="loading" :color="color" :size="size"></rotate-loader>
// <fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>
// <pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>
// <square-loader :loading="loading" :color="color" :size="size"></square-loader>
// <scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>
// <skew-loader :loading="loading" :color="color" :size="size"></skew-loader>
// <moon-loader :loading="loading" :color="color" :size="size"></moon-loader>
// <ring-loader :loading="loading" :color="color" :size="size"></ring-loader>
// <bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>          
// <dot-loader :loading="loading" :color="color" :size="size"></dot-loader>