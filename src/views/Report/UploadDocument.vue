<template>
    <div class="container mt-5">
        <div v-if="userType == 2">
            <p class="dashboard-title-text">Rincian Tindak Lanjut</p>
        </div>
        <div v-else>
            <p class="dashboard-title-text">Rincian Temuan</p>
        </div>
    

    <div class="dashboard-container-fluid">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Temuan dan Tindak Lanjut Pengawas</h4>
            </div>
            <div class="dashboard-container-form">
                <div class="row" style="margin-top: 30px;">
                    <div class="col-md-6">
                        <p class="dashboard-title-form">Informasi Dasar</p>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex justify-content-end">
                            <label 
                                    :class="getLabelClass(model.report.status)"
                                    >
                                    {{ getStatusText(model.report.status) }}
                                </label>
                        </div>
                    </div>
                </div>
                
                <p class="finding-section-text">Temuan dari hasil pengawasan dan rencana tindak lanjutnya dapat dilihat pada rincian berikut.</p>

                <div class="row">
                        <div class="col-sm-9">
                            <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Poin Temuan</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.poinTemuan }}</p>

                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Rincian Temuan</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.rincianTemuan }}</p>

                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Dampak/Risiko</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.jenisTemuan }}</p>

                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Rekomendasi</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.rencanaTindakLanjut }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">PIC Pengawas</h5>
                                    <p style="font-size: 16; font-weight: 400;">{{ model.report.supervisor }}</p>
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Judul Temuan</h5>
                                    <p class="card-text">{{ model.report.judulTemuan }}</p>
                                    <!-- <a href="#" class="btn btn-danger">Unduh Dokumen</a> -->
                                    <div v-show="model.report.status > 4">
                                        <h5 class="card-title" style="font-size: 16; font-weight: 700;">Dokumen</h5>
                                        <p class="card-text">{{ model.report.dokumenTemuan }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid-bottom">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Tindak Lanjut</h4>
            </div>
            <div class="dashboard-container-form">
                <p class="finding-section-text">Tindak lanjut bank dapat dilihat pada rincian berikut.</p>

                <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Poin Tindak Lanjut</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.poinTindakLanjut }}</p>

                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Komitmen Tindak Lanjut</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.komitmenTindakLanjut }}</p>

                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Target Penyelesaian</h5>
                                    <p style="font-size: 16; font-weight: 400;">{{ formatDate(model.report.targetPenyelesaian) }}</p>
                                </div>
                            </div>
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid-doc" v-if="model.report.status == 6">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Bukti Tindak Lanjut</h4>
            </div>
            <div class="dashboard-container-form">
                <label for="searchQuery" class="form-label" style="margin-top: 32px;">Dokumen</label>
                <input
                                v-model="model.report.dokumenTindakLanjut"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid-doc" v-if="model.report.status == 4">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Dokumen Hasil Pemeriksaan</h4>
            </div>
            <div class="dashboard-container-form">
                <label for="searchQuery" class="form-label" style="margin-top: 32px;">Dokumen</label>
                <input
                                v-model="model.report.dokumenTemuan"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid-table" v-show="model.rejectedHistories.length > 0">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">History Penolakan</h4>
            </div>
            <div class="dashboard-container-form" style="margin-top: 32px;">
                <div class="card">
                    <div class="card-body">
                        <table class="table" style="text-align: left;">
                            <thead class="table-light">
                                <tr>
                                    <th>No</th>
                                    <th>Deskripsi Penolakan</th>
                                    <th>Otoritas</th>
                                </tr>
                            </thead>
                            <tbody v-if="model.rejectedHistories.length > 0">
                                <tr v-for="(history, index) in model.rejectedHistories" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ history.description }}</td>
                                    <td>{{ getAuthority(history.rejectedStep) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row" style="margin-left: 0px; margin-bottom: 80px; margin-top: 36px;">
        <button type="button" @click="openModal(true)" class="btn btn-accept" style="margin-left: auto;">Kirim</button>
    </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal d-block" tabindex="-1" @click.self="closeModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center">
                <div class="modal-header justify-content-center">
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img :src="askIconUrl" alt="OJK Logo" class="logo mb-3" />
                    <p style="font-size: 20px; font-weight: 600">Apakah Anda yakin semua informasi yang telah diinput sudah benar?</p>
                    <p style="font-size: 14px; font-weight: 500; color: #666666;">Pastikan data telah sesuai sebelum mengirimkannya.</p>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-outline-danger" style="width: 223px; height: 40px; color: #A90704; border-color: #A90704;" @click="closeModal">Kembali</button>
                    <button type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="saveDocument">Kirim</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

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



.dashboard-container-fluid-table {
background-color: #ffffff;
min-height: 300px;
border-radius: 8px;
padding-bottom: 32px;
margin-top: 32px
}

.modal.d-block {
display: block; /* Ensures modal is visible when v-if is true */
background: rgba(0, 0, 0, 0.5); /* Adds a dim background overlay */
}

.btn-reject {
width: 169px;
height: 40px;
color: #A90704;
border-color: #A90704;
margin-right: 8px;
}

.btn-accept {
width: 169px;
height: 40px;
background-color: #A90704;
color: white;
}

.create-report-wrapper {
margin-top: 60px;
}

.form-title {
font-size: 20px;
font-weight: 700;
margin-top: 20px;
}

.dashboard-title-text {
font-size: 30px;
font-weight: 700;
margin-top: 20px;
margin-bottom: 36px;
}

.dashboard-title-form {
font-size: 20px;
font-weight: 700;
}

.dashboard-container-form {
padding-left: 24px;
padding-right: 24px;
}

.dashboard-container-fluid {
background-color: #ffffff;
margin-bottom: 36px;
min-height: 500px;
border-radius: 8px;
padding-bottom: 32px;
}

.dashboard-container-fluid-bottom {
background-color: #ffffff;
margin-bottom: 36px;
min-height: 400px;
border-radius: 8px;
padding-bottom: 32px;
}

.dashboard-container-fluid-doc {
background-color: #ffffff;
min-height: 200px;
border-radius: 8px;
margin-top: 36px;
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

.finding-section-text {
font-size: 16px;
font-weight: 400;
margin-top: 22px;
}

.modal.d-block {
background: rgba(0, 0, 0, 0.5);
}
</style>

<script>
import axiosInstance from '../../axiosInstance';
export default {
name: 'reportCreate',
computed: {
    askIconUrl() {
        return new URL('@/assets/images/Icon_ask.svg', import.meta.url).href;
    },
    userType() {
        return localStorage.getItem('userType')
    },
},
data(){
    return {
        showModal: false,
        isAccepted: false,
        errorList: [],
        model: {
            report: {
                periode: '',
                jenisTemuan: '',
                judulTemuan: '',
                poinTemuan: '',
                rincianTemuan: '',
                rencanaTindakLanjut: '',
                dokumenTemuan: '',
                tanggalPemeriksaan: '',
                targetPenyelesaian: '',
                poinTindakLanjut: '',
                komitmenTindakLanjut: '',
                waktuPenyelesaian: '',
                dokumenTindakLanjut: '',
                bank:'',
                supervisor: '',
                status: 0,
                alasan: null,
            },
            rejectedHistories: []
        }
    }
},
mounted() {
    this.getReport(this.$route.params.id);
},
methods: {
    getAuthority(step) {
        if (this.userType == 2) {
            return "Pengawas"
        } else {
            switch (step) {
                case 0:
                case 3:
                case 5:
                case 8:
                    return "Reviewer"
                case 2:
                case 6:
                    return "Pengawas"
                default:
                    "-"
            }
        }
        },
        openModal(isAccepted) {
            this.showModal = true;
        },
        closeModal() {
            this.isAccepted = false;
            this.showModal = false;
        },
        back() {
            this.$router.push('/dashboard')
        },
        async getReport(reportId) {
            try {
                    const response = await axiosInstance.get(`/api/report/${reportId}`)
                    const histories = await axiosInstance.get(`/api/reason/all/${reportId}`)
                    console.log(response.data.data)
                    this.model.report = response.data.data
                    this.model.report.bank = response.data.data.bank.Name
                    this.model.report.supervisor = response.data.data.supervisor.Name
                    this.model.report.targetPenyelesaianInput = this.dateConverter(this.model.report.targetPenyelesaian)
                    this.model.report.waktuPenyelesaianInput = this.dateConverter(this.model.report.waktuPenyelesaian)
                    this.model.report.statusInput = this.statusConverter(this.model.report.status)
                    this.model.rejectedHistories = histories.data.data
                } catch (error) {
                    console.log('Error fetching data:', error)
                }
        },
        formatDate(dateString) {
            // Create a Date object from the input string
            const date = new Date(dateString);

            // Get day, month, and year
            const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
            const year = date.getFullYear();

            // Return the formatted date
            return `${day}/${month}/${year}`;
    },
        dateConverter(dateString) {
            // Create a Date object
            const dateObject = new Date(dateString);

            // Get the year and month in the desired format
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const day = String(dateObject.getDate()).padStart(2, '0');

            // Format the date as 'YYYY-MM-DD'
            return `${year}-${month}-${day}`;
        },
        statusConverter(status) {
            if (status == 1) {
                return 'Dalam Proses'
            } else if (status == 2) {
                return 'Belum Review'
            } else if (status == 3) {
                return 'Selesai'
            } else if (status == 99) {
                return 'Pending'
            }
        },
        async saveDocument() {
            try {
                if (this.model.report.status == 4) {
                    const data = {
                    id: this.model.report.id,
                    dokumenTemuan: this.model.report.dokumenTemuan,
                    status: (this.model.report.status + 1)
                    }
                    console.log(data)
                    const _ = await axiosInstance.put('/api/report/dokumen-temuan', data)
                } else if (this.model.report.status == 6) {
                    const data = {
                    id: this.model.report.id,
                    dokumenTindakLanjut: this.model.report.dokumenTindakLanjut,
                    status: (this.model.report.status + 1)
                    }
                    console.log(data)
                    const _ = await axiosInstance.put('/api/report/dokumen-tindak-lanjut', data)
                }

                this.errorList = [];
                this.$router.push('/dashboard')
            } catch (e){
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
                            return 'Rejects';
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