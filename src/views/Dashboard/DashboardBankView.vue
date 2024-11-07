
<template>
    <div>
        <p class="dashboard-title-text">Dashboard</p>
        <div class="dashboard-container-fluid">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Kelola Bank</h4>
                </div>
                <p class="finding-section-text">Untuk menambah akses pengguna, silakan tekan tombol di bawah ini.</p>
                <button @click="onTapAddBank" class="btn btn-outline-danger add-record-btn"><i class="material-icons">add</i>Tambah Bank</button>
            </div>
        </div>

        <div class="container d-flex h-100 flex-column" style="margin-top: 10px; margin-bottom: 20px">
            <div class="row flex-fill d-flex">
                    <div class="col-sm text-center d-flex align-items-center justify-content-center">
                        <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari"
                        class="form-control"
                        />
                    </div>
                </div>
            </div>

        <div class="card">
            <div class="card-body">
                <table class="table" style="text-align: center">
                    <thead class="table-light">
                        <tr>
                            <th>No</th>
                            <th>Bank</th>
                            <th>Alamat</th>
                            <th>Aksi</th>             
                        </tr>
                    </thead>
                    <tbody v-if="filteredBanks.length > 0">
                        <tr v-for="(bank, index) in filteredBanks" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ bank.bank }}</td>
                            <td>{{ bank.address }}</td>  
                            <td>
                                <button type="button" @click="onTapDelete" class="btn btn-reject">Hapus</button>
                                <button type="button" @click="onTapEdit" class="btn btn-accept">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                    <!-- <tbody v-else>
                        <tr>
                            <td colspan="7">Loading...</td>
                        </tr>
                    </tbody> -->
                </table>
            </div>
        </div>
        


        <!-- Modal Create User -->
        <div v-if="showModal" class="modal d-block" tabindex="-1" @click.self="closeModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content text-center">
                    <div class="modal-header justify-content-center">
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p style="font-size: 20px; font-weight: 700; margin-bottom: 0px;text-align: left;">Formulir Registrasi Bank</p>
                        <p style="font-size: 14px; font-weight: 500; color: #666666;text-align: left;">Mohon isi data Bank dengan sesuai.</p>
                        

                        <p style="margin-bottom:4; text-align: left">Nama Bank</p>
                                <input
                                    v-model="createForm.nama"
                                    type="text"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />

                                <p style="margin-bottom:4; text-align: left">Alamat</p>
                                <input
                                    v-model="createForm.address"
                                    type="text"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />
                                </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-danger" style="width: 223px; height: 40px; color: #A90704; border-color: #A90704;" @click="closeModal">Kembali</button>
                        <button type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="submitForm">Daftar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../../axiosInstance';

export default {
    name: 'report',
    computed: {
        openIconUrl() {
            return new URL('@/assets/images/Icon_Open.svg', import.meta.url).href;
        },
        userType() {
            return localStorage.getItem('userType')
        },
        filteredBanks() {
            return this.banks.filter(bank => {
                // Adjust fields based on what you want to search by
                const fieldsToSearch = [
                bank.bank,
                bank.address,
                ];
                
                // Join all fields to search in a single query
                return fieldsToSearch.some(field => 
                field && field.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            });
        }
    },
    data(){
        return {
            showModal: false,
            searchQuery: "",
            nameQuery: "",
            statusQuery: "",
            banks: [],
            createForm: {
                name: "",
                address: ""
            },
            banks: [],
        }
    },
    mounted(){
        this.getBanks();
    },
    methods: {
        async getBanks() {
            try {
                const response = await axiosInstance.get('/api/bank')
                this.banks = response.data.data
                console.log(response.data.data)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        async submitForm() {
            try {
                const data = {
                name: this.createForm.nama,
                address: this.createForm.address,
            }
            const _ = await axiosInstance.post('/api/bank', data)
            location.reload()
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        closeModal() {
            this.showModal = false;
        },
        onTapAddBank() {
            this.showModal = true;
        },
        onTapEdit() {
            alert('Edit Button Tapped!')
        },
        onTapDelete() {
            alert('Delete Button Tapped!')
        }
    }
}
</script>

<style scoped>

.modal.d-block {
    display: block; /* Ensures modal is visible when v-if is true */
    background: rgba(0, 0, 0, 0.5); /* Adds a dim background overlay */
}

.btn-reject {
width: 82px;
height: 36px;
color: #A90704;
border-color: #A90704;
margin-right: 8px;
padding-bottom: 15px;
}

.btn-accept {
width: 82px;
height: 36px;
background-color: #A90704;
color: white;
}

.rounded-label-in-progress {
  background-color: #e0f2fe; /* Light blue */
  color: #00468b; /* Dark blue */
  border: none;
  border-radius: 20px; /* Adjust radius as needed */
  padding: 5px 15px;
  cursor: pointer;
}

.rounded-label-in-reviewed {
  background-color: #FFF5D8; /* Light blue */
  color: #9F7707; /* Dark blue */
  border: none;
  border-radius: 20px; /* Adjust radius as needed */
  padding: 5px 15px;
  cursor: pointer;
}

.rounded-label-pending {
  background-color: #FFE9E9; /* Light blue */
  color: #A90704; /* Dark blue */
  border: none;
  border-radius: 20px; /* Adjust radius as needed */
  padding: 5px 15px;
  cursor: pointer;
}

.rounded-label-done {
  background-color: #CFFFC6; /* Light blue */
  color: #1C5B10; /* Dark blue */
  border: none;
  border-radius: 20px; /* Adjust radius as needed */
  padding: 5px 15px;
  cursor: pointer;
}

.dashboard-container {
    margin-top: 28px;
}

.dashboard-section-title {
    font-size: 20px;
    font-weight: 700;
    background-color: #870603;
    color: #FFFFFF;
    padding-top:20px;
    padding-bottom: 14px;
    padding-left: 24px;
    height: 63px;
}

.dashboard-title-text {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
}

.dashboard-container-fluid {
  background-color: #ffffff;
  margin-bottom: 36px;
  height: 197px;
  border-radius: 8px;
}

.dashboard-card {
  border: none;
  background-color: #FFE9E9;
}

.dashboard-card-body {
  padding: 20px;
  font-size: 16px;
}

.dashboard-card-title {
  font-size: 32px;
  font-weight: bold;
}

.dashboard-card-text {
    width: 198px;
    height: 42px;
  font-size: 16px;
  text-align: left;
  margin-left: 10px;
}

.finding-section-text {
    font-size: 16px;
    font-weight: 400;
    margin-left: 24px;
    margin-top: 32px;
}

.add-record-btn {
    margin-left: 24px;
    display: flex;
    align-items: center;      /* Centers icon and text vertically */
    justify-content: center;
    padding-top: 8px;
    padding-bottom: 8px;
    color: #A90704;
    border-color: #A90704;
}
</style>