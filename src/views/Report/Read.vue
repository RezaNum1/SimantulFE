<template>
    <div class="container mt-5">
    <p class="dashboard-title-text">Rincian Tindak Lanjut</p>
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
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">PIC Pengawas</h5>
                                    <p style="font-size: 16; font-weight: 400;">Lolly Vadel</p>
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Target Penyelesaian</h5>
                                    <p class="card-text">{{ formatDate(model.report.targetPenyelesaian) }}</p>
                                    <!-- <a href="#" class="btn btn-danger">Unduh Dokumen</a> -->
                                    <div v-show="model.report.dokumenTemuan != ''">
                                        <h5 class="card-title" style="font-size: 16; font-weight: 700;">Dokumen</h5>
                                        <p class="card-text">{{ model.report.dokumenTemuan }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9; margin-top: 16px;">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 16; font-weight: 700;">Rencana Tindak Lanjut Pengawas</h5>
                            <p style="font-size: 14px; font-weight: 400;">{{ model.report.rencanaTindakLanjut }}</p>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Formulir Tindak Lanjut</h4>
            </div>
            <div class="dashboard-container-form">
                <p class="dashboard-title-form" style="margin-top: 32px;">Informasi Dasar</p>
                <p class="finding-section-text">Berikut adalah rencana tindak lanjut yang telah disusun sebelumnya.</p>

                <div class="row">
                        <div class="col-sm-9">
                            <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Poin Tindak Lanjut</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.poinTindakLanjut }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Target Penyelesaian</h5>
                                    <p style="font-size: 16; font-weight: 400;">{{ formatDate(model.report.targetPenyelesaian) }}</p>
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Tanggal Pembuatan</h5>
                                    <p class="card-text" style="font-size: 16; font-weight: 400;">{{ formatDate(model.report.waktuPenyelesaian) }}</p>
                                    <!-- <a href="#" class="btn btn-danger">Unduh Dokumen</a> -->
                                    <div v-show="model.report.dokumenTindakLanjut != ''">
                                        <h5 class="card-title" style="font-size: 16; font-weight: 700;">Dokumen</h5>
                                        <p class="card-text">{{ model.report.dokumenTindakLanjut }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9; margin-top: 16px;">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 16; font-weight: 700;">Komitmen Tindak Lanjut</h5>
                            <p style="font-size: 14px; font-weight: 400;">{{ model.report.komitmenTindakLanjut }}</p>
                        </div>
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

.modal.d-block {
display: block; /* Ensures modal is visible when v-if is true */
background: rgba(0, 0, 0, 0.5); /* Adds a dim background overlay */
}
.btn-submit {
width: 79px;
height: 40px;
background-color: #A90704;
color: white;
margin-top: 32px;
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
height: 565px;
border-radius: 8px;
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
            banks: [],
        }
    }
},
mounted() {
    this.getReport(this.$route.params.id);
},
methods: {
    openModal() {
        this.showModal = true;
    },
    closeModal() {
        this.showModal = false;
    },
    async getReport(reportId) {
        try {
            const response = await axiosInstance.get(`/api/report/${reportId}`)
            this.model.report = response.data.data
            console.log(this.model.report)
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
                            return 'Reject';
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