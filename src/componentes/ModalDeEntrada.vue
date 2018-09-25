<script>
import CampoParaInformarRenda from "./CampoParaInformarRenda.vue";
import TabelasDeImpostoDeRenda from "./TabelasDeImpostoDeRenda";
import IconeDeCarregando from "./IconeDeCarregando.vue";

export default {
    name: "modal-de-entrada",
    data() {
        return {
            estaAberto: true,
            estaCarregando: false
        }
    },
    computed: {
        salario() {
            return this.$store.state.salario;
        }
    },
    methods: {
        fechar() {
            if(this.salario !== null){
                this.estaAberto = false;
                this.$store.commit("calcularImpostoDeRendaIndividual", {tabelas: TabelasDeImpostoDeRenda, salario: this.$store.state.salario });
            }
        },
        calcularImpostoDeRendaInvididual() {
            this.estaCarregando = true;
            setTimeout(function(){
                this.estaCarregando = false;
                this.$store.commit("calcularImpostoDeRendaIndividual", {tabelas: TabelasDeImpostoDeRenda, salario: this.$store.state.salario });
                this.$store.commit("registraPrimeiroCalculo");
                this.fechar();
            }.bind(this), Math.floor(Math.random() * 600) + 300 );

        }
    },
    components: {
        CampoParaInformarRenda,
        IconeDeCarregando
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
                <p>Informe sua renda mensal e compare o valor do seu imposto de renda em várias tabelas diferentes.</p>
            </section>

            <footer class="modal-card-foot">
                <button class="button is-link"
                        @click="calcularImpostoDeRendaInvididual"
                        :disabled="salario === null || salario === '' || estaCarregando ">
                        <span v-if="!estaCarregando">Calcular</span>
                        <span v-else>
                            <icone-de-carregando></icone-de-carregando>
                        </span>
                </button>
            </footer>
        </div>
    </div>
</template>