<template>
    <div>
        <cabecalho></cabecalho>
        <main v-if="this.$store.state.jaCalculouUmaVez">
            <section class="container section">
                <div class="columns">
                    <div class="column is-one-third">
                        <div class="field">
                            <label class="label">Renda / Salário </label>
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input  :value="this.$store.state.salario"
                                            placeholder="Informe sua renda mensal atual aqui"
                                            @input="calcularImposto"
                                            class="input">
                                    <span class="icon is-small is-left"><span>R&dollar;</span></span>
                                </div>
                            </div>
                        </div>
                        <etiquetas :etiquetas="etiquetas"></etiquetas>
                    </div>
                    <div class="column is-two-thirds">
                        <column-chart  :xtitle="salarioEmTexto"
                            ytitle="Imposto mensal"
                            :data="grafico"
                            legend="true"
                            :colors="cores"
                            :download="true"
                            decimal=","
                            prefix="R$">
                        </column-chart>
                    </div>
                </div>
            </section>
        </main>
        <main v-else>
            <section class="container section"></section>
        </main>
        <rodape></rodape>
        <modal-de-entrada></modal-de-entrada>
    </div>

</template>

<script>
import CalculadoraDeImpostoDeRenda from "./componentes/CalculadoraDeImpostoDeRenda";
import TabelasDeImpostoDeRenda from "./componentes/TabelasDeImpostoDeRenda";
import ModalDeEntrada from "./componentes/ModalDeEntrada.vue";
import Rodape from "./componentes/Rodape.vue";
import Etiquetas from "./componentes/Etiquetas.vue";
import Cabecalho from "./componentes/Cabecalho.vue";
import CampoParaInformarRenda from "./componentes/CampoParaInformarRenda.vue";

export default {
    name: 'app',
    data () {
        return {}
    },
    computed: {
        resultados: function () {
            return this.$store.state.resultados;
        },
        salario: function () {
            return this.$store.state.salario;
        },
        cores: function() {
            return [this.resultados.map(resultado => resultado.cor)];
        },
        grafico: function () {
            return this.resultados.map(resultado => [resultado.nome, resultado.impostoDevido]);
        },
        etiquetas: function () {
            const textosPossiveis = {
                "R$ <imposto-devido>": (resultado) => {
                    return resultado.eVigente;
                },
                "(Isento)" : (resultado) => {
                    return resultado.impostoDevido === 0
                },
                "Pague menos R$ <diferenca>": (resultado) => {
                    return resultado.diferenca > 0;
                },
                "Pague mais R$ <diferenca>": (resultado) => {
                    return resultado.diferenca < 0;
                }
            };
            return this.resultados
                .map(resultado => {
                    const texto = Object.keys(textosPossiveis)
                        .filter(texto => textosPossiveis[texto](resultado))
                        .join(" ")
                        .replace("<imposto-devido>", resultado.impostoDevido)
                        .replace("<diferenca>", Math.abs(resultado.diferenca));

                    return {
                        nome: resultado.nome,
                        temDesconto: resultado.temDesconto,
                        eVigente: resultado.eVigente,
                        texto
                    }
                });
        },
        salarioEmTexto: function() {
            return `Salário: R$ ${this.salario === null ? 0 : this.inserirPontuacao(this.salario) },00` ;
        }
    },
    components: {
        ModalDeEntrada,
        Etiquetas,
        Rodape,
        Cabecalho,
        CampoParaInformarRenda
    },
    methods: {
        inserirPontuacao(texto) {
                return texto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        calcularImposto: function(evento) {
            this.$store.commit("definirSalario", evento.target.value);
            this.$store.commit("calcularImpostoDeRendaIndividual", {tabelas: TabelasDeImpostoDeRenda, salario: this.salario });
            this.$store.commit("registraPrimeiroCalculo");
        }
    }
}
</script>

<style lang="sass" src="bulma"></style>
