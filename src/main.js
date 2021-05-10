import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faSyncAlt,
  faCommentDots,
  faHeart,
  faEdit,
  faTrashAlt,
  faSignOutAlt,
  faHome,
  faUserAlt,
  faBroadcastTower,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import TextareaAutosize from "vue-textarea-autosize";

library.add(
  faSpinner,
  faSyncAlt,
  faCommentDots,
  faHeart,
  faEdit,
  faTrashAlt,
  faSignOutAlt,
  faHome,
  faUserAlt,
  faBroadcastTower,
  faUsers
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(TextareaAutosize);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
