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
            
                <div v-show="model.report.status > 4">
                    <label for="searchQuery" class="form-label" >Link Dokumen</label>
                    <input
                    disabled
                    v-model="model.report.dokumenTemuan"
                    type="text"
                    id="searchQuery"
                    placeholder=""
                    class="form-control"
                    />
                </div>

            
                <div class="d-flex h-100 flex-column" style="margin-top: 20px;">
                    <div class="row flex-fill d-flex">
                        <div class="col-sm text-start d-flex flex-column align-items-start" style="margin-bottom: 32px;">
                            <label for="searchQuery" class="form-label">Target Penyelesaian</label>
                            <input
                                disabled
                                v-model="model.report.targetPenyelesaianInput"
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
                                v-model="model.report.statusInput"
                                type="text"
                                id="searchQuery"
                                placeholder=""
                                class="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="dashboard-container-fluid-bottom" v-show="model.report.status > 0">
        <div>
            <div class="dashboard-section-title">
                <h4 class="">Tindak Lanjut Bank</h4>
            </div>
            <div class="dashboard-container-form">
                <p class="finding-section-text">Berikut adalah tindak lanjut yang akan dilakukan oleh Bank untuk menindaklanjuti hasil temuan.</p>

                <div class="row">
                        <div class="col-sm-9">
                            <div class="card" style="background-color: #FFE9E9; border-color: #FFE9E9">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Poin Temuan</h5>
                                    <p style="font-size: 14px; font-weight: 400;">{{ model.report.poinTindakLanjut }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">PIC Bank</h5>
                                    <p style="font-size: 16; font-weight: 400;">{{ model.report.supervisor }}</p>
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Target Penyelesaian</h5>
                                    <p style="font-size: 16; font-weight: 400;">{{ dateConverter(model.report.targetPenyelesaianInput) }}</p>
                                    <!-- <a href="#" class="btn btn-danger">Unduh Dokumen</a> -->
                                    <h5 class="card-title" style="font-size: 16; font-weight: 700;">Dokumen</h5>
                                    <p class="card-text">{{ model.report.dokumenTindakLanjut }}</p>
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
    <div class="row" style="margin-left: 0px; margin-bottom: 80px; margin-top: 36px;">
        <button type="button" @click="openModal(false)" class="btn btn-reject">Ditolak</button>
        <button type="button" @click="openModal(true)" class="btn btn-accept">Disetujui</button>
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
                        <div v-if="isAccepted">
                            <p style="font-size: 20px; font-weight: 600">Apakah Anda yakin ingin menyetujui tindak lanjut dari Bank?</p>
                            <p style="font-size: 14px; font-weight: 500; color: #666666;">Pastikan rencana tindak lanjut telah sesuai dengan kebutuhan dan standar yang ditetapkan.</p>
                        </div>
                        <div v-if="isAccepted == false">
                            <p style="font-size: 20px; font-weight: 600">Apakah Anda yakin ingin menolak tindak lanjut dari Bank?</p>
                            <p style="font-size: 14px; font-weight: 500; color: #666666;">Jika Anda yakin untuk menolak rencana tindak lanjut ini, mohon sertakan alasan penolakan agar dapat ditindaklanjuti.</p>
                            <textarea class="form-control" v-model="model.report.alasan" placeholder="" id="floatingTextarea2" style="height: 110px;"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-danger" style="width: 223px; height: 40px; color: #A90704; border-color: #A90704;" @click="closeModal">Kembali</button>
                        <div v-if="isAccepted">
                            <button type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="authorizeReport">Disetujui</button>
                        </div>
                        <div v-else-if="isAccepted == false">
                            <button :disabled="!model.report.alasan"  type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="authorizeReport">Ditolak</button>
                        </div>
                    </div>
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
min-height: 1000px;
border-radius: 8px;
}

.dashboard-container-fluid-bottom {
background-color: #ffffff;
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
        }
    }
},
mounted() {
    this.getReport(this.$route.params.id);
},
methods: {
        openModal(isAccepted) {
            this.isAccepted = isAccepted;
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
                    console.log(response.data.data)
                    this.model.report = response.data.data
                    this.model.report.bank = response.data.data.bank.Name
                    this.model.report.supervisor = response.data.data.supervisor.Name
                    this.model.report.targetPenyelesaianInput = this.dateConverter(this.model.report.targetPenyelesaian)
                    this.model.report.waktuPenyelesaianInput = this.dateConverter(this.model.report.waktuPenyelesaian)
                    this.model.report.statusInput = this.statusConverter(this.model.report.status)
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
        },
        async authorizeReport() {
            try {
                if (this.isAccepted) {
                    this.model.report.status = (this.model.report.status + 1)
                } else {
                    console.log("1")
                    if (this.model.report.status == 2 || this.model.report.status == 7) {
                        this.model.report.status = (this.model.report.status + 1)
                    } else if (this.model.report.status == 0) {
                        this.model.report.status = 99
                    } else if (this.model.report.status > 3 && this.model.report.status < 6) {
                        this.model.report.status = 99
                    } else if (this.model.report.status > 1 && this.model.report.status < 4) {
                        this.model.report.status = 98
                    } else if (this.model.report.status > 5 && this.model.report.status < 9) {
                        this.model.report.status = 98
                    } 
                }
                console.log(this.isAccepted)
                console.log(this.model.report.status)
                const _ = await axiosInstance.put('/api/report/status', this.model.report)
                this.errorList = [];
                this.$router.push('/dashboard')
            } catch (e){
                console.log('Error fetching data:', error)
            }
        }
    }
}
</script>