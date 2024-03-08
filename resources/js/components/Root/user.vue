
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();
let user = ref([]);
let error = ref('');

const fetchUser = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        user.value = response.data.users;
    } catch (error) {
        console.error('Error fetching user information:', error);
        error.value = 'Error fetching user information';
    }
};

const logout = async () => {
    try {
        
        localStorage.removeItem('token');
        router.push('/'); 
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
const downloadPdf = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/download-pdf', {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user_information.pdf');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error downloading PDF:', error);
    }
};
fetchUser(); 
</script>
<template>
    <div class="container">
        <p v-if="error">{{ error }}</p>
        <form @submit.prevent="login">
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Email : </label>
                <span>{{ user.name }}</span>
            </div>
            <br>
            <br>
            <div class="">
                <label style="margin-left:31px;" for=""> Email : </label>
                <span>{{ user.email }}</span>
            </div>
            <br>
            <br>
        </form>
        <button @click="logout">Logout</button>

        <div>
        <button @click="downloadPdf">Download PDF</button>
       </div>
    </div>
</template>
