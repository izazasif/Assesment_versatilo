
<script setup>
    import { reactive, ref } from "vue"
    import { useRouter } from "vue-router"
    
    const router = useRouter()
    let form = reactive({
        email:'',
        password:'',
    })
    let error = ref('') 
    const login = async () => {
        try {
        const response = await axios.post('/api/login', form);
        if (response.data.authorization.token) {
            localStorage.setItem('token', response.data.authorization.token);
            router.push('/profile');
        } else {
            error.value = response.data.message || 'Login failed'; 
        }
    } catch (error) {
        console.error('Error during login:', error);
        error.value = 'An error occurred during login';
    }
  };
</script>
<template>
    <div class="container">
        <p v-if="error">{{ error }}</p>
        <form @submit.prevent="login">
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Email : </label>
                <input type="email" name="email" placeholder="Enter Your Email" v-model="form.email" style="margin-left: 48px;"/>
            </div>
            <br>
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Password : </label>
                <input type="password" name="password" style="margin-left:18px;" v-model="form.password" />
            </div>
            <br>
            <br>
            <button type="submit" style="margin-left: 280px;">Login</button>
        </form>
        <div>
            <h2 class="invoice__title"> <router-link class="btn btn-secondary" to="/">Back</router-link></h2>
        </div>
    </div>
</template>
