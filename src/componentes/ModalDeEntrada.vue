<script>
import CampoParaInformarRenda from "./CampoParaInformarRenda.vue";

export default {
    name: "modal-de-entrada",
    data() {
        return {
            estaAberto: false
        }
    },
    methods: {
        fechar() {
            this.estaAberto = false;
        }
    },
    components: {
        "campo-para-informar-renda": CampoParaInformarRenda
    }
}
</script>
<template>
    <div v-bind:class="estaAberto ? 'modal is-active' : 'modal' ">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Comparador de IR</p>
                <button class="delete" aria-label="close" @click="fechar"></button>
            </header>
            <section class="modal-card-body">
                <p>Infome sua renda mensal e descubra quanto você pagaria de imposto de renda em cada proposta de atualização da tabela.</p>
                <campo-para-informar-renda></campo-para-informar-renda>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="fechar">Ver mais informações</button>
            </footer>
        </div>
    </div>
</template>