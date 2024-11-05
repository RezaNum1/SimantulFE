<template>
    <div class="container mt-5">
    <p class="dashboard-title-text">Rincian Temuan</p>
    <div class="dashboard-container-fluid">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Formulir Temuan dan Tindak Lanjut</h4>
            </div>
            <div class="dashboard-container-form">
                <p class="finding-section-text">Mohon lengkapi temuan hasil pemeriksaan yang telah dilakukan dengan mengisi formulir di bawah ini.</p>
                <p class="dashboard-title-form">Informasi Dasar</p>

                <!-- INFORMASI DASAR -->
                <div class="d-flex h-100 flex-column" style="margin-bottom: 20px;">
                    <div class="row flex-fill d-flex">
                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Tanggal Pemeriksaan</label>
                            <input
                                disabled
                                v-model="model.report.tanggalPemeriksaan"
                                type="date"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>

                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Nomor Laporan Hasil Pemeriksaan</label>
                            <input
                                disabled
                                v-model="model.report.periode"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>

                <div class="d-flex h-100 flex-column" style="margin-bottom: 20px;">
                    <div class="row flex-fill d-flex">
                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Judul Pemeriksaan</label>
                            <input
                                disabled
                                v-model="model.report.judulTemuan"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>

                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Nama Bank</label>
                            <input
                                disabled
                                v-model="model.report.bank"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>

                <label for="floatingTextarea2" style="margin-bottom: 4px;">Poin Temuan</label>
                <textarea disabled v-model="model.report.poinTemuan" class="form-control" placeholder="" id="floatingTextarea2" style="height: 110px"></textarea>

                <hr style="margin-top: 32px; margin-bottom: 32px;">
                <!-- RINCIAN TEMUAN DAN TINDAK LANJUT -->

                <p class="dashboard-title-form">Rincian Temuan dan Tindak Lanjut</p>

                <label for="floatingTextarea2" style="margin-bottom: 4px;">Jenis Temuan</label>
                <input
                    disabled
                    v-model="model.report.jenisTemuan"
                    type="text"
                    id="searchQuery"
                    placeholder=""
                    class="form-control"
                    style="margin-bottom: 20px;"
                />
                <label for="floatingTextarea2" style="margin-bottom: 4px;">Rincian Temuan</label>
                <textarea disabled class="form-control" v-model="model.report.rincianTemuan" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px"></textarea>

                <label for="floatingTextarea2" style="margin-bottom: 4px;">Rencana Tindak Lanjut</label>
                <textarea disabled class="form-control" v-model="model.report.rencanaTindakLanjut" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px"></textarea>
            
                <label for="searchQuery" class="form-label">Link Dokumen</label>
                <input
                    disabled
                    v-model="model.report.dokumenTemuan"
                    type="text"
                    id="searchQuery"
                    placeholder=""
                    class="form-control"
                />
            
                <div class="d-flex h-100 flex-column" style="margin-top: 20px;">
                    <div class="row flex-fill d-flex">
                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Target Penyelesaian</label>
                            <input
                                disabled
                                v-model="model.report.targetPenyelesaian"
                                type="date"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>

                        <div class="col-sm text-start d-flex flex-column align-items-start">
                            <label for="searchQuery" class="form-label">Status</label>
                            <input
                                disabled
                                v-model="model.report.status"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>
                <RouterLink :to="{ path: '/dashboard' }" class="btn btn-submit">
                    Kembali
                </RouterLink>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

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
margin-top: 20px;
margin-bottom: 16px;
}

.dashboard-container-form {
padding-left: 24px;
padding-right: 24px;
}

.dashboard-container-fluid {
background-color: #ffffff;
margin-bottom: 36px;
height: 1300px;
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
margin-top: 32px;
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
                bank:'',
                status: 0,
            },
        }
    }
},
mounted() {
    this.getReport(this.$route.params.id);
},
methods: {
        back() {
            this.$router.push('/dashboard')
        },
        async getReport(reportId) {
            try {
                    const response = await axiosInstance.get(`/api/report/${reportId}`)
                    console.log(response.data.data)
                    this.model.report = response.data.data
                    this.model.report.targetPenyelesaian = this.dateConverter(this.model.report.targetPenyelesaian)
                    this.model.report.waktuPenyelesaian = this.dateConverter(this.model.report.waktuPenyelesaian)
                    this.model.report.bank = response.data.data.bank.Name
                    this.model.report.status = this.statusConverter(this.model.report.status)
                } catch (error) {
                    console.log('Error fetching data:', error)
                }
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
        }
    }
}
</script>