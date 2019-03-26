<template>
  <AccountPanel>
    <div>
      <div class="tab-pane fade show active" id="dashboard" role="tabpanel">
        <div class="myaccount-content">
          <h3>Panel</h3>

          <div class="welcome">
            <p>Hello,
              <strong>{{user.bill_first_name}} {{ user.bill_last_name}}</strong> (If Not
              <strong>{{user.bill_first_name}} !</strong>
              <a href="#" @click.prevent="$store.dispatch('logout')" class="logout">Logout</a>)
            </p>
          </div>

          <p class="mb-0">
            From your account panel. you can easily check & view your
            recent orders, manage your shipping and billing addresses and edit your
            password and account details.
          </p>
        </div>
      </div>
      <div class="single-input-item">
        <label>account-first-name</label>
        <span v-if="!editMode" class="d-block">{{user.bill_first_name}}</span>
        <input
          v-if="editMode"
          type="text"
          class="input-style account-style"
          v-model="accountDetails.fname"
          name="bill_first_name"
          required
          readonly
          placeholder="Fill your first name"
        >
      </div>
      <div class="single-input-item">
        <label>account-last-name</label>

        <span v-if="!editMode" class="d-block">{{ user.bill_last_name}}</span>
        <input
          v-if="editMode"
          type="text"
          v-model="accountDetails.lname"
          name="bill_last_name"
          required
          readonly
          placeholder="Fill your last name"
        >
      </div>
      <div class="single-input-item">
        <label>account-email</label>
        <span class="d-block">{{user.email}}</span>
      </div>
    </div>
  </AccountPanel>
</template>

<script>
import AccountPanel from '~/layouts/nested/AccountPanel';
import { mapGetters } from 'vuex';
/*...Object.assign(Object.keys(this.$store.initialData)
        .map((prop)=>{
          return {
            [prop] : function () {
              return this.$store.initialData[prop]
            }
          }
        }))*/
export default {
  components:{
    AccountPanel
  },
  data(){
    return {
      editMode:false
    }
  },
    computed:{
        ...mapGetters([
          'user'
        ])
    }
};
</script>

<style>
</style>
