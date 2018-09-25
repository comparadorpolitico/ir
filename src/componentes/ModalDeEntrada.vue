<script>
import CampoParaInformarRenda from "./CampoParaInformarRenda.vue";
import TabelasDeImpostoDeRenda from "./TabelasDeImpostoDeRenda";

export default {
    name: "modal-de-entrada",
    data() {
        return {
            estaAberto: true
        }
    },
    methods: {
        fechar() {
            this.estaAberto = false;
        },
        calcularImpostoDeRendaInvididual() {
            this.$store.commit("calcularImpostoDeRendaIndividual", {tabelas: TabelasDeImpostoDeRenda, salario: this.$store.state.salario })
            this.$store.commit("registraPrimeiroCalculo");
            this.fechar();
        }
    },
    components: {
        "campo-para-informar-renda": CampoParaInformarRenda
    }
}
</script>
<template>
    <div v-bind:class="estaAberto ? 'modal is-active' : 'modal' ">
        <div class="modal-background" @click="fechar()"></div>
        <div class="modal-card">

            <header class="modal-card-head">
                <p class="modal-card-title">Comparador de IR</p>
            </header>

            <section class="modal-card-body">
                <campo-para-informar-renda></campo-para-informar-renda>
                <p>Informe sua renda mensal e compare o valor do seu imposto de renda.</p>
            </section>

            <footer class="modal-card-foot">
                <button class="button is-link" @click="calcularImpostoDeRendaInvididual">Calcular</button>
            </footer>
        </div>
    </div>
</template>