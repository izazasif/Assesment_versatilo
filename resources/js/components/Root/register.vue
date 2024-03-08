
<script setup>
    import { reactive, ref } from "vue"
    import { useRouter } from "vue-router";
    import QRCode from "qrcode"; 
    const router = useRouter()

    let form = reactive({
        name:'',
        email:'',
        password:'',
    }) 
  
    let error = ref('') 
    let qrCode = ref(null);

    const register = async() =>{
                try {
                const response = await axios.post('/api/register',form)
                    const userDetails = `Name: ${form.name}\nEmail: ${form.email}`;
                    qrCode.value = await QRCode.toDataURL(userDetails);
                    alert('Registration successful! Please login to continue.');
              } 
             catch (error) {
                alert(error);
        }
    }
</script>
<template>
    <div class="container">
        <p v-if="error">{{ error }}</p>
        <form @submit.prevent="register">
            <div class="">
                <label style="margin-left:31px;" for=""> Name : </label>
                <input type="text" name="name" placeholder="Enter Your Name" v-model="form.name" style="margin-left: 43px;"/>
            </div>
            <br>
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Email : </label>
                <input type="email" name="email" v-model="form.email" placeholder="Enter Your Email" style="margin-left: 48px;"/>
            </div>
            <br>
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Password : </label>
                <input type="password" name="password" v-model="form.password" style="margin-left:18px;"/>
            </div>
            <br>
            <br>
            <button type="submit" style="margin-left: 280px;">Register</button>
        </form>
        <div>
            <h2 class="invoice__title"> <router-link class="btn btn-secondary" to="/">Back</router-link></h2>
        </div>
        <div v-if="qrCode">
            <img :src="qrCode" alt="QR Code" />
        </div>
    </div>
</template>
