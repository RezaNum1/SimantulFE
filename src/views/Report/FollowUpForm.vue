<template>
    <div class="container mt-5">
    <p class="dashboard-title-text">Rincian Tindak Lanjut (Follow Up)</p>

    <div class="custom-alert mt-4" style="margin-bottom: 36px;" v-show="showAlert">
        <div class="alert-icon">
            <span>&#9888;</span> <!-- Warning Icon -->
        </div>
        <div class="alert-content">
            <p class="alert-title">Alasan Penolakan</p>
            <p class="alert-text">
                {{  this.model.report.alasan }}
            </p>
        </div>
        <button @click="closeAlert" aria-label="Close">&times;</button>
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
                                :class="[
                                    model.report.status == 1 ? 'rounded-label-in-progress' :
                                    model.report.status == 2 ? 'rounded-label-in-reviewed' :
                                    model.report.status == 3 ? 'rounded-label-done' :
                                    model.report.status == 99 ? 'rounded-label-pending' : 'rounded-label-in-progress'
                                ]"
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

    <div class="dashboard-container-followup">
        <div class="dashboard-section-title">
            <h4 class="">Formulir Tindak Lanjut</h4>
        </div>
        <div class="dashboard-container-form">
                <p class="dashboard-title-form" style="margin-top: 32px;">Rincian Tindak Lanjut</p>
                <label for="floatingTextarea2" style="margin-bottom: 4px;">Poin Tindak Lanjut</label>
                <textarea v-model="model.report.poinTindakLanjut" class="form-control" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px;"></textarea>

                <label for="floatingTextarea2" style="margin-bottom: 4px;">Komitmen Tindak Lanjut</label>
                <textarea v-model="model.report.komitmenTindakLanjut" class="form-control" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px;"></textarea>
                    <div class="d-flex h-100 flex-column" style="margin-top: 20px;">
                        <div class="row flex-fill d-flex">
                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Target Penyelesaian</label>
                                <input
                                    v-model="model.report.targetPenyelesaianInput"
                                    type="date"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                />
                            </div>

                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Tanggal Pembuatan</label>
                                <input
                                    v-model="model.report.waktuPenyelesaianInput"
                                    type="date"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <button type="button" @click="openModal" class="btn btn-submit" style="width: 90px; height: 35px">Kirim</button>
                    </div>
        </div>
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
                        <button type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="submit">Kirim</button>
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
margin-top: 32px;
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

.dashboard-container-followup {
background-color: #ffffff;
margin-bottom: 36px;
height: 630px;
border-radius: 8px;
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

.custom-alert {
    background-color: #ffe6cc;
            border-left: 5px solid #d96b1c;
            color: #5c3c1e;
            padding: 16px;
            border-radius: 8px;
            display: flex;
            align-items: start;
            font-family: Arial, sans-serif;
        }
        .custom-alert .alert-icon {
            font-size: 24px;
            margin-right: 12px;
            color: #d96b1c;
        }
        .custom-alert .alert-content {
            flex: 1;
        }
        .custom-alert .alert-title {
            font-weight: bold;
            margin: 0;
            font-size: 16px;
        }
        .custom-alert .alert-text {
            margin: 0;
            font-size: 14px;
        }
        .custom-alert .close-btn {
            font-size: 18px;
            color: #5c3c1e;
            background: none;
            border: none;
            cursor: pointer;
        }
</style>

<script>
import axiosInstance from '../../axiosInstance';
export default {
name: 'reportFollowUp',
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
        showAlert: false,
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
                targetPenyelesaianInput: '',
                bank:'',
                poinTindakLanjut: '',
                komitmenTindakLanjut: '',
                waktuPenyelesaianInput: '',
                waktuPenyelesaian: '',
                dokumenTindakLanjut: '',
                status: 0,
                prevStatus: 0,
                alasan: ''
            },
        }
    }
},
mounted() {
    this.getReport(this.$route.params.id);
},
methods: {
    closeAlert() {
        this.showAlert = false;
    },
    getStatusText(status) {
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

            if (this.userType == 2 && this.model.report.status == 99) {
                this.showAlert = true;
            }
            console.log(this.model.report)
        } catch (error) {
            console.log('Error fetching data:', error)
        }
    },
    async submit() {
        try {
            this.closeModal()
            var mythis = this;
            this.model.report.waktuPenyelesaian = `${this.formatDateToISO(this.model.report.waktuPenyelesaianInput)}`
            this.model.report.targetPenyelesaian = `${this.formatDateToISO(this.model.report.targetPenyelesaianInput)}`

            if (this.model.report.prevStatus == 3 && this.model.report.status == 98) {
                this.model.report.status = 2
            } else if (this.model.report.prevStatus == 98 && this.model.report.status == 98){
                this.model.report.status = 7
            } else {
                this.model.report.status = (this.model.report.status + 1)
            }

            console.log(this.model.report)
            const _ = await axiosInstance.put('/api/report/bank', this.model.report)

            this.model.report = {
                periode: '',
                jenisTemuan: '',
                judulTemuan: '',
                poinTemuan: '',
                rincianTemuan: '',
                rencanaTindakLanjut: '',
                dokumenTemuan: '',
                tanggalPemeriksaan: '',
                targetPenyelesaian: '',
                targetPenyelesaianInput: '',
                bank:'',
                poinTindakLanjut: '',
                komitmenTindakLanjut: '',
                waktuPenyelesaianInput: '',
                waktuPenyelesaian: '',
                dokumenTindakLanjut: '',
                status: 0,
            }

            this.errorList = [];
            this.$router.push('/dashboard')
        } catch (error) {
            console.log('Error fetching data:', error)
            if (error.status) {
                mythis.errorList.push("Please fill all the fields!");
            } 
        }
    },
    formatDateToISO(dateStr) {
            // Parse the date and set desired time
            const date = new Date(dateStr);
            date.setHours(17, 45, 0); // Set time to 17:45:00

            // Format date to 'yyyy-mm-ddThh:mm:ss+02:00'
            const options = {
                timeZone: 'Europe/Berlin', // Set the desired timezone (offset +02:00)
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
            };

            const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(date);
            
            // Manually insert the time zone offset
            const isoFormatted = formattedDate.replace(',', '').replace(' ', 'T') + '+02:00';
            
            return isoFormatted;
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
    }
}
}
</script>