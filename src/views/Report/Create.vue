<template>
        <div class="container mt-5">
        <p class="dashboard-title-text">Rincian Temuan</p>
        <div class="dashboard-container-fluid-1">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Formulir Temuan dan Tindak Lanjut</h4>
                </div>
                <div class="dashboard-container-form">
                    <p class="finding-section-text">Mohon lengkapi informasi hasil pemeriksaan yang telah dilakukan dengan mengisi formulir di bawah ini.</p>

                    <!-- INFORMASI DASAR -->
                    <div class="d-flex h-100 flex-column" style="margin-bottom: 20px;">
                        <div class="row flex-fill d-flex">
                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Tanggal Pemeriksaan</label>
                                <input
                                    v-model="model.report.tanggalPemeriksaanInput"
                                    type="date"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                />
                            </div>

                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Periode Pemeriksaan</label>
                                <input
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
                                    v-model="model.report.judulTemuan"
                                    type="text"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                />
                            </div>

                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Jenis Pemeriksaan</label>
                                <select class="form-select" v-model="model.report.jenisPemeriksaan">
                                    <option>Pemeriksaan Umum</option>
                                    <option>Pemeriksaan Khusus</option>
                                </select>
                            </div> 
                        </div>
                    </div>

                    <div class="d-flex h-100 flex-column" style="margin-bottom: 20px;">
                        <div class="row flex-fill d-flex">
                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Nama Bank</label>
                                <select class="form-select" v-model="model.report.bankID">
                                    <option v-for="bank in model.banks" :key="bank.bank" :value="bank.id">
                                    {{ bank.bank }}
                                </option>
                                </select>
                            </div>

                            <div class="col-sm text-start d-flex flex-column align-items-start">
                                <label for="searchQuery" class="form-label">Jenis Kantor Bank</label>
                                <select class="form-select" v-model="model.report.jenisKantor">
                                    <option>Kantor Pusat</option>
                                    <option>Kantor Cabang</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-container-fluid-2">
            <div>
                <div class="dashboard-section-title">
                    <h4 class="">Rincian Temuan dan Tindak Lanjut</h4>
                </div>
                <div class="dashboard-container-form">
                    <p class="finding-section-text">Mohon lengkapi rincian hasil temuan dari pemeriksaan yang telah dilakukan dengan mengisi formulir di bawah ini.</p>

                    <label for="floatingTextarea2" style="margin-bottom: 4px;">Jenis Temuan</label>
                    <select class="form-select" style="margin-bottom: 20px;" v-model="model.report.jenisTemuan">
                        <option value="Kasus Fraud">Kasus Fraud</option>
                        <option value="Penggelapan Dana">Penggelapan Dana</option>
                    </select>

                    <label for="floatingTextarea2" style="margin-bottom: 4px;">Poin Temuan</label>
                    <input
                        v-model="model.report.poinTemuan"
                            type="text"
                            id="searchQuery"
                            placeholder=""
                            class="form-control"
                            style="margin-bottom: 20px;"
                    />

                    <label for="floatingTextarea2" style="margin-bottom: 4px;">Rincian Temuan</label>
                    <textarea class="form-control" v-model="model.report.rincianTemuan" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px"></textarea>

                    <label for="floatingTextarea2" style="margin-bottom: 4px;">Rekomendasi (opsional)</label>
                    <textarea class="form-control" v-model="model.report.rencanaTindakLanjut" placeholder="" id="floatingTextarea2" style="height: 110px; margin-bottom: 20px"></textarea>

                    <div class="col-sm text-start d-flex flex-column align-items-start" style="margin-bottom: 20px;">
                                <label for="searchQuery" class="form-label">Target Penyelesaian</label>
                                <input
                                    v-model="model.report.targetPenyelesaianInput"
                                    type="date"
                                    id="searchQuery"
                                    placeholder=""
                                    class="form-control"
                                />
                            </div>

                    <label for="floatingTextarea2" style="margin-bottom: 4px;">Pemeriksa</label>
                    <select class="form-select" v-model="model.report.leaderID">
                        <option v-for="leader in model.leaders" :key="leader.name" :value="leader.id">
                            {{ leader.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <button type="button" @click="openModal" class="btn btn-submit" style="margin-top: 0px; margin-bottom: 100px; height: 40px;width: 141px;border-radius: 4px;">Kirim</button>


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
                        <button type="button" class="btn btn-danger" style="width: 223px; height: 40px; background-color: #A90704" @click="createReport">Kirim</button>
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
    margin-top: 20px;
    margin-bottom: 16px;
}

.dashboard-container-form {
    padding-left: 24px;
    padding-right: 24px;
}

.dashboard-container-fluid-1 {
  background-color: #ffffff;
  margin-bottom: 36px;
  min-height: 410px;
  border-radius: 8px;
}

.dashboard-container-fluid-2 {
  background-color: #ffffff;
  margin-bottom: 36px;
  min-height: 500px;
  border-radius: 8px;
  padding-bottom: 32px
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
                    jenisPemeriksaan: '',
                    jenisKantor: '',
                    poinTemuan: '',
                    rincianTemuan: '',
                    rencanaTindakLanjut: '',
                    dokumenTemuan: '',
                    tanggalPemeriksaanInput: '',
                    tanggalPemeriksaan: '',
                    targetPenyelesaianInput: '',
                    targetPenyelesaian: '',
                    bankID: '',
                    supervisorID: `${localStorage.getItem('id')}`,
                    status: 0,
                    leaderID: '',
                },
                banks: [],
                leaders: []
            }
        }
    },
    mounted() {
        this.getBanks();
        this.getLeaders();
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async getBanks() {
            try {
                const response = await axiosInstance.get('/api/bank')
                this.model.banks = response.data.data
                console.log(this.model.banks)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        async getLeaders() {
            try {
                const response = await axiosInstance.get('/api/leader')
                this.model.leaders = response.data.data
                console.log(this.model.leaders)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        },
        async createReport(){
            try {
                this.closeModal()
                var mythis = this;
                this.model.report.tanggalPemeriksaan = `${this.formatDateToISO(this.model.report.tanggalPemeriksaanInput)}`
                this.model.report.targetPenyelesaian = `${this.formatDateToISO(this.model.report.targetPenyelesaianInput)}`
                this.model.report.status = Number(this.model.report.statusInput)
                console.log(this.model.report)
                const _ = await axiosInstance.post('/api/report', this.model.report)
                this.model.report = {
                    periode: '',
                    jenisTemuan: '',
                    judulTemuan: '',
                    jenisPemeriksaan: '',
                    jenisKantor: '',
                    poinTemuan: '',
                    rincianTemuan: '',
                    rencanaTindakLanjut: '',
                    dokumenTemuan: '',
                    tanggalPemeriksaanInput: '',
                    tanggalPemeriksaan: '',
                    targetPenyelesaianInput: '',
                    targetPenyelesaian: '',
                    bankID: '',
                    supervisorID: '',
                    status: 0,
                    leaderID: '',
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
        }
    }
}
</script>