<template>
    <div>
        <p class="dashboard-title-text">Dashboard</p>
        <div class="dashboard-container-fluid">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Akses Pengguna</h4>
                </div>
                <p class="finding-section-text">Untuk menambah akses pengguna, silakan tekan tombol di bawah ini.</p>
                <button @click="onTapAddUser" class="btn btn-outline-danger add-record-btn"><i class="material-icons">add</i>Tambah Pengguna</button>
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
                    <div class="col-sm text-center d-flex align-items-center justify-content-center">
                        <select class="form-select" v-model="nameQuery">
                            <option disabled value="">Nama Pegawai</option>
                            <option value="BCA">BCA</option>
                            <option value="CIMB Niaga">CIMB Niaga</option>
                        </select>
                    </div>
                    <div class="col-sm text-center d-flex align-items-center justify-content-center">
                        <select class="form-select" v-model="statusQuery">
                        <option disabled value="">Status</option>
                        <option value="1">Pengawas</option>
                        <option value="2">Reviewer</option>
                        <option value="99">Bank</option>
                    </select>
                    </div>
                </div>
            </div>

        <div class="card">
            <div class="card-body">
                <table class="table" style="text-align: center;">
                    <thead class="table-light">
                        <tr>
                            <th>NIP</th>
                            <th>Nama Pegawai</th>
                            <th>Jabatan</th>
                            <th>Status</th>
                            <th>Rincian Informasi</th>
                            <th>Aksi</th>                    
                        </tr>
                    </thead>
                    <tbody v-if="filteredUsers.length > 0">
                        <tr v-for="(user, index) in filteredUsers" :key="index">
                            <td>{{ user.nip }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.jabatan }}</td>
                            <td>{{ getUserText(user.type) }}</td>
                            <td>
                                <button type="button" class="btn" @click="goToViewForm(user.id)">
                                Lihat
                                <img :src="openIconUrl" alt="OJK Logo" class="logo" />
                                </button>
                            </td>
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
                        <p style="font-size: 20px; font-weight: 700; margin-bottom: 0px;text-align: left;">Formulir Pengguna</p>
                        <p style="font-size: 14px; font-weight: 500; color: #666666;text-align: left;">Mohon isi data pengguna berdasarkan tipe pengguna yang sesuai.</p>
                        
                        
                        <p style="margin-bottom:4; text-align: left">Status</p>
                        <select class="form-select" style="margin-bottom: 20px;" v-model="createForm.status">
                            <option value="1">Pengawas</option>
                            <option value="99">Reviewer</option>
                            <option value="2">Bank</option>
                        </select>

                        <div v-show="createForm.status == '1' || createForm.status == '99'">
                                <p style="margin-bottom:4; text-align: left">Nama Pegawai</p>
                                <input
                                    v-model="createForm.nama"
                                    type="text"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />

                                <div class="d-flex h-100 flex-column" style="margin-top: 20px;">
                                    <div class="row flex-fill d-flex">
                                        <div class="col-sm text-start d-flex flex-column align-items-start">
                                            <label for="searchQuery" class="form-label">NIP</label>
                                            <input
                                                v-model="createForm.nip"
                                                type="text"
                                                id="searchQuery"
                                                placeholder=""
                                                class="form-control"
                                            />
                                        </div>

                                        <div class="col-sm text-start d-flex flex-column align-items-start">
                                            <label for="searchQuery" class="form-label">Jabatan</label>
                                            <select class="form-select" style="margin-bottom: 20px;" v-model="createForm.jabatan">
                                                <option value="Supervisor">Supervisor</option>
                                                <option value="Senior Analis">Senior Analis</option>
                                                <option value="Kepala Department">Kepala Department</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                    <p style="margin-bottom:4; text-align: left">Email</p>
                                    <input
                                        v-model="createForm.email"
                                        type="email"
                                        id="searchQuery"
                                        placeholder=""
                                        class="form-control"
                                        style="margin-bottom: 20px;"
                                    />

                                    <p style="margin-bottom:4; text-align: left">Password</p>
                                    <input
                                        v-model="createForm.password"
                                        type="password"
                                        id="searchQuery"
                                        placeholder=""
                                        class="form-control"
                                        style="margin-bottom: 20px;"
                                    />

                                    <p style="margin-bottom:4; text-align: left">Nomor Handphone</p>
                                    <input
                                        v-model="createForm.noHandphone"
                                        type="number"
                                        id="searchQuery"
                                        placeholder=""
                                        class="form-control"
                                        style="margin-bottom: 20px;"
                                    />

                                    <div v-show="createForm.status == 1">
                                        <p style="margin-bottom:4; text-align: left">Nama Bank</p>
                                        <select class="form-select" style="margin-bottom:20px;" v-model="createForm.bankId">
                                            <option v-for="bank in banks" :key="bank.bank" :value="bank.id">
                                                {{ bank.bank }}
                                            </option>
                                        </select>
                                    </div>           
                    </div>

                    <div v-show="createForm.status == '2'">
                                <p style="margin-bottom:4; text-align: left">Nama Pegawai</p>
                                <input
                                    v-model="createForm.nama"
                                    type="text"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />

                                <p style="margin-bottom:4; text-align: left">Nama Bank</p>
                                <select class="form-select" style="margin-bottom:20px;" v-model="createForm.bankId">
                                    <option v-for="bank in banks" :key="bank.bank" :value="bank.id">
                                        {{ bank.bank }}
                                    </option>
                                </select>

                                <p style="margin-bottom:4; text-align: left">Email</p>
                                <input
                                    v-model="createForm.email"
                                    type="email"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />

                                <p style="margin-bottom:4; text-align: left">Password</p>
                                    <input
                                        v-model="createForm.password"
                                        type="password"
                                        id="searchQuery"
                                        placeholder=""
                                        class="form-control"
                                        style="margin-bottom: 20px;"
                                    />

                                <p style="margin-bottom:4; text-align: left">Nomor Handphone</p>
                                <input
                                    v-model="createForm.noHandphone"
                                    type="number"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                    style="margin-bottom: 20px;"
                                />
                            </div>
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
        filteredUsers() {
            return this.users.filter(user => {
                // Adjust fields based on what you want to search by
                const fieldsToSearch = [
                user.nip,
                user.nama,
                user.jabatan,
                user.status,
                user.email,
                ];
                
                // Join all fields to search in a single query
                return fieldsToSearch.some(field => 
                field && field.toString().toLowerCase().includes(this.searchQuery.toLowerCase() || this.nameQuery.toLowerCase() || this.statusQuery.toLowerCase())
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
                status: "",
                nama: "",
                nip: "",
                jabatan: "",
                email: "",
                noHandphone: "",
                bankId: "",
                password: ""
            },
            users: [],
        }
    },
    mounted(){
        this.getUsers()
        this.getBanks();
    },
    methods: {
        async getBanks() {
            try {
                const response = await axiosInstance.get('/api/bank')
                this.banks = response.data.data
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        async getUsers() {
            try {
                const response = await axiosInstance.get('/api/user')
                console.log(response.data.data)
                this.users = response.data.data
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        getUserText(status) {
            if (status == '1') {
                return 'Pengawas'
            } else if (status == '2') {
                return 'Bank'
            } else if (status == '99') {
                return 'Reviewer'
            }
        },
        async submitForm() {
            try {
                const data = {
                name: this.createForm.nama,
                email: this.createForm.email,
                nip: this.createForm.nip,
                phone: `${this.createForm.noHandphone}`,
                jabatan: this.createForm.jabatan,
                type: Number(this.createForm.status),
                password: this.createForm.password,
                bankId: this.createForm.bankId
            }
            console.log(data)
            const _ = await axiosInstance.post('/api/user', data)
            location.reload()
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        closeModal() {
            this.showModal = false;
        },
        onTapAddUser() {
            this.createForm = {
                status: "",
                nama: "",
                nip: "",
                jabatan: "",
                email: "",
                noHandphone: "",
                bankId: "",
                password: ""
            },
            this.showModal = true;
        },
        onTapEdit() {
            this.showModal = true;
        },
        onTapDelete() {
            this.$router.push('/report/create')
        },
        goToViewForm(id) {
            this.$router.push(`/report/${id}/readForm`)
        },
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