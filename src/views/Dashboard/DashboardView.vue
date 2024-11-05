<template>
    <div>
        <p class="dashboard-title-text">Dashboard</p>

        <div class="dashboard-container-fluid">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Ringkasan Keseluruhan</h4>
                </div>
                <div class="container d-flex h-100 flex-column">
                    <div class="row flex-fill d-flex dashboard-container">
                        <div class="dashboard-card col m-2 d-flex align-items-center card">
                            <div class="card-body col-sm text-center d-flex align-items-center justify-content-center">
                                <h2 class="card-title">{{ totalInspection }}</h2>
                                <p class="card-text dashboard-card-text">Jumlah Pemeriksaan yang telah dilakukan</p>
                            </div>
                        </div>
                        <div class="dashboard-card col m-2 d-flex align-items-center card">
                            <div class="card-body col-sm text-center d-flex align-items-center justify-content-center">
                                <h2 class="card-title">{{ waitingForFixing }}</h2>
                                <p class="card-text dashboard-card-text">Tindak lanjut yang belum dilakukan</p>
                            </div>
                        </div>
                        <div class="dashboard-card col m-2 d-flex align-items-center card">
                            <div class="card-body col-sm text-center d-flex align-items-center justify-content-center">
                                <h2 class="card-title">{{ inReview }}</h2>
                                <p class="card-text dashboard-card-text">Tindak lanjut yang telah dilakukan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-container-fluid" v-show="userType == 1">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Temuan dan Tindak Lanjut</h4>
                </div>
                <p class="finding-section-text">Silakan klik di sini untuk menginput temuan dari hasil pemeriksaan yang telah dilakukan.</p>
                <button @click="goToCreateForm" class="btn btn-outline-danger add-record-btn"><i class="material-icons">add</i>Tambah Temuan</button>
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
                        <select class="form-select" v-model="bankNameQuery">
                            <option disabled value="">Nama Bank</option>
                            <option value="BCA">BCA</option>
                            <option value="CIMB Niaga">CIMB Niaga</option>
                        </select>
                    </div>
                    <div class="col-sm text-center d-flex align-items-center justify-content-center">
                        <select class="form-select" v-model="statusQuery">
                        <option disabled value="">Status</option>
                        <option value="1">Dalam Proses</option>
                        <option value="2">Belum Review</option>
                        <option value="99">Pending</option>
                        <option value="3">Selesai</option>
                    </select>
                    
                    </div>
                </div>
            </div>

        <div class="card">
            <div class="card-body">
                <table class="table" style="text-align: center;">
                    <thead class="table-light">
                        <tr>
                            <th v-show="userType == 1 || userType == 99">Periode</th>
                            <th v-show="userType == 1 || userType == 99">Jenis Temuan</th>
                            <th>Judul Temuan</th>
                            <th v-show="userType == 1 || userType == 99">Bank</th>
                            <th v-show="userType == 1 || userType == 99">Target Penyelesaian</th>
                            <th v-show="userType == 1 || userType == 99">Waktu Penyelesaian</th>
                            <th v-show="userType == 2">PIC Pengawas</th>
                            <th v-show="userType == 2">Poin Temuan</th>
                            <th v-show="userType == 2">Rencana Tindak Lanjut Pengawas</th>
                            <th v-show="userType == 2">Tindak Lanjut Bank</th>
                            <th>Status</th>
                            <th>Aksi</th>                            
                        </tr>
                    </thead>
                    <tbody v-if="filteredReports.length > 0">
                        <tr v-for="(report, index) in filteredReports" :key="index">
                            <td v-show="userType == 1 || userType == 99">{{ report.periode }}</td>
                            <td>{{ report.judulTemuan }}</td>
                            <td v-show="userType == 1 || userType == 99">{{ report.jenisTemuan }}</td>
                            <td v-show="userType == 1 || userType == 99">{{ report.bank.Name }}</td>
                            <td v-show="userType == 1 || userType == 99">{{ formatDate(report.targetPenyelesaian) }}</td>
                            <td v-show="userType == 1 || userType == 99">{{ formatDate(report.waktuPenyelesaian) }}</td>
                            <td v-show="userType == 2">{{ report.supervisor.Name }}</td>
                            <td v-show="userType == 2">{{ report.poinTemuan }}</td>
                            <td v-show="userType == 2">{{ report.rencanaTindakLanjut }}</td>
                            <td v-show="userType == 2">{{ report.komitmenTindakLanjut }}</td>
                            <td>
                                <label 
                                    :class="getLabelClass(report.status)"
                                    >
                                    {{ getStatusText(report.status) }}
                                </label>
                            </td>
                            <td>
                                <div v-if="userType == 1">
                                    <div v-if="report.status == 0 || report.status == 1 || report.status == 3 || report.status == 5 || report.status == 6 || report.status == 8 || report.status == 9 || report.status == 98">
                                        <button type="button" class="btn" @click="goToViewForm(report.id, report.status)">
                                            Lihat
                                            <img :src="openIconUrl" alt="OJK Logo" class="logo" />
                                        </button>
                                    </div>

                                    <div v-else-if="report.status == 2 || report.status == 7">
                                        <RouterLink :to="{ path: '/report/'+report.id+'/authorization' }" class="btn" style="width: 131px; height: 36px; color: white; background-color: #A90704;">
                                        Tindak Lanjuti
                                        </RouterLink>
                                    </div>

                                    <div v-else-if="report.status == 4">
                                        <RouterLink :to="{ path: `/report/${report.id}/document` }" class="btn" style="width: 131px; height: 36px; color: white; background-color: #A90704;">
                                        Tindak Lanjuti
                                        </RouterLink>
                                    </div>

                                    <div v-if="report.status == 99">
                                        <button type="button" class="btn" style="border-color: #A90704; color: #A90704; width: 131px; height: 36px" @click="goToViewForm(report.id, report.status)">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                <div v-if="userType == 2">
                                    <div v-if="report.status == 1">
                                        <RouterLink :to="{ path: '/report/'+report.id+'/followUp' }" class="btn" style="width: 131px; height: 36px; color: white; background-color: #A90704;">
                                        Tindak Lanjuti
                                        </RouterLink>
                                    </div>
                                    
                                    <div v-if="report.status == 2 || report.status == 4 || report.status == 5 || report.status == 7 || report.status == 9 || report.status == 99">
                                        <button type="button" class="btn" @click="goToViewForm(report.id, report.status)">
                                            Lihat
                                            <img :src="openIconUrl" alt="OJK Logo" class="logo" />
                                        </button>
                                    </div>

                                    <div v-else-if="report.status == 6">
                                        <RouterLink :to="{ path: `/report/${report.id}/document` }" class="btn" style="width: 131px; height: 36px; color: white; background-color: #A90704;">
                                        Tindak Lanjuti
                                        </RouterLink>
                                    </div>

                                    <div v-if="report.status == 98">
                                        <button type="button" class="btn" style="border-color: #A90704; color: #A90704; width: 131px; height: 36px" @click="goToViewForm(report.id, report.status)">
                                            Edit
                                        </button>
                                    </div>
                                </div>


                                <div v-if="userType == 99">
                                    <div v-if="report.status == 0 || report.status == 3 || report.status == 5 || report.status == 8 ">
                                        <RouterLink :to="{ path: '/report/'+report.id+'/authorization' }" class="btn" style="width: 131px; height: 36px; color: white; background-color: #A90704;">
                                        Tindak Lanjuti
                                        </RouterLink>
                                    </div>

                                    <div v-if="report.status == 1 || report.status == 2 || report.status == 4 || report.status == 6 || report.status == 7 || report.status == 9 || report.status == 99 || report.status == 98">
                                        <button type="button" class="btn" @click="goToViewForm(report.id, report.status)">
                                            Lihat
                                            <img :src="openIconUrl" alt="OJK Logo" class="logo" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        filteredReports() {
        return this.reports.filter(report => {
            // Adjust fields based on what you want to search by
            const fieldsToSearch = [
            report.periode,
            report.jenisTemuan,
            report.judulTemuan,
            report.bank.Name,
            report.supervisor.Name,
            report.poinTemuan,
            report.rencanaTindakLanjut,
            report.komitmenTindakLanjut,
            report.status
            ];
            
            // Join all fields to search in a single query
            return fieldsToSearch.some(field => 
            field && field.toString().toLowerCase().includes(this.searchQuery.toLowerCase() || this.bankNameQuery.toLowerCase() || this.statusQuery.toLowerCase())
            );
        });
        }
    },
    data(){
        return {
            searchQuery: "",
            bankNameQuery: "",
            statusQuery: "",
            reports: [],
            waitingForFixing: 0,
            inReview: 0,
            totalInspection: 0,
        }
    },
    mounted(){
        this.getReports()
    },
    methods: {
        async getReports() {
            try {
                const response = await axiosInstance.get('/api/report')
                console.log(response.data.data)
                if (this.userType == 2) {
                    this.reports = response.data.data.filter(report => (report.status > 0 && report.status != 99) || (report.status > 0 && report.prevStatus > 1))
                } else {
                    this.reports = response.data.data
                }
                
                this.waitingForFixing = this.reports.filter(report => report.status == 1).length
                this.inReview = this.reports.filter(report => report.status >= 2 && report.status < 9).length
                this.totalInspection = this.reports.filter(report => report.status == 9).length
                console.log(this.reports[0].bank.Name)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        getStatusText(status) {
            console.log(this.userType)
            console.log(status)
            if (this.userType == 1 || this.userType == 3 || this.userType == 99) {
                switch (status) {
                        case 0:
                        case 1:
                            return 'Dalam Proses';
                        case 2:
                        case 3:
                            return 'Belum Review';
                        case 4:
                        case 5:
                        case 6:
                            return 'Pengumpulan Berkas';
                        case 7:
                        case 8:
                            return 'Verifikasi';
                        case 9:
                            return 'Selesai';
                        case 99:
                            return 'Reject';
                        case 98:
                            return 'Pending';
                        default:
                            return 'Dalam Proses';
                    }
            } else if (this.userType == 2) {
                switch (status) {
                        case 0:
                        case 1:
                            return 'Dalam Proses';
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            return 'Belum Review';
                        case 6:
                            return 'Pengumpulan Berkas';
                        case 7:
                        case 8:
                            return 'Verifikasi';
                        case 9:
                            return 'Selesai';
                        case 98:
                            return 'Pending';
                        default:
                            return 'Belum Review';
                    }
            }
        },
        goToCreateForm() {
            this.$router.push('/report/create')
        },
        goToViewForm(id, reportStatus) {
            if (reportStatus == 1) {
                this.$router.push(`/report/${id}/readForm`)
            } else if (this.userType == 2 && reportStatus == 98) {
                this.$router.push(`/report/${id}/followup`)
            } else if (this.userType == 1 && reportStatus == 99) {
                this.$router.push(`/report/${id}/edit`)
            } else {
                this.$router.push(`/report/${id}/read`)
            }
        },
        formatDate(dateString) {
            if (dateString != '' && !dateString.includes('0001')) {
                // Create a Date object from the input string
                const date = new Date(dateString);

                // Get day, month, and year
                const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
                const year = date.getFullYear();

                // Return the formatted date
                return `${day}/${month}/${year}`;
            } else {
                return ''
            }
        },
        getLabelClass(status) {
            if (this.userType == 1 || this.userType == 3 || this.userType == 99) {
                switch (status) {
                        case 0, 1:
                            return 'rounded-label-in-progress';
                        case 2, 3:
                            return 'rounded-label-in-reviewed';
                        case 4, 5, 6:
                            return 'rounded-label-collecting';
                        case 7, 8:
                            return 'rounded-label-verification';
                        case 9:
                            return 'rounded-label-done';
                        case 99:
                            return 'rounded-label-reject'
                        case 98:
                            return 'rounded-label-pending'
                        default:
                            return 'rounded-label-in-progress';
                    }
            } else {
                switch (status) {
                        case 0, 1:
                            return 'rounded-label-in-progress';
                        case 2, 3, 4, 5:
                            return 'rounded-label-in-reviewed';
                        case 6:
                            return 'rounded-label-collecting';
                        case 7, 8:
                            return 'rounded-label-verification';
                        case 9:
                            return 'rounded-label-done';
                        case 98:
                            return 'rounded-label-pending'
                        default:
                            return 'rounded-label-in-reviewed';
                    }
            }
        },
    }
}
</script>

<style scoped>
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

.rounded-label-collecting {
  background-color: #CFFFC6; /* Light blue */
  color: #1C5B10; /* Dark blue */
  border: none;
  border-radius: 20px; /* Adjust radius as needed */
  padding: 5px 15px;
  cursor: pointer;
}

.rounded-label-verification {
  background-color: #CFFFC6; /* Light blue */
  color: #1C5B10; /* Dark blue */
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

.rounded-label-reject {
  background-color: #FFE9E9; /* Light blue */
  color: #A90704; /* Dark blue */
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