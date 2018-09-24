<template>
    <div>
        <header class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Comparador de Imposto de Renda
                    </h1>
                    <h2 class="subtitle is-hidden-mobile">
                        Descubra quanto você paga hoje e quanto pagaria de acordo com várias propostas de alteração da tabela do imposto de renda.
                    </h2>
                </div>
            </div>
            <div class="hero-foot">
                <nav class="tabs is-boxed">
                    <div class="container">
                        <ul>
                            <li class="is-active"><a href>Propostas</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>



        <div class="container section" id="app">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Renda / Salário</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control has-icons-left has-icons-right">
                            <input v-model="salario"
                                   v-on:keyup="calcularImposto"
                                   placeholder="Informe sua renda mensal atual aqui"
                                   class="input">
                            <span class="icon is-small is-left">
                                <span>R&dollar;</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <bar-chart  :xtitle="salarioEmTexto"
                        ytitle="Propostas"
                        :data="grafico"
                        legend="true"
                        :dataset="{borderWidth: 10}"
                        :colors="cores"
                        :download="true"
                        decimal=","
                        prefix="R$"></bar-chart>
        </div>
        <rodape></rodape>
    </div>

</template>

<script>
import CalculadoraDeImpostoDeRenda from "./componentes/CalculadoraDeImpostoDeRenda";
import TabelasDeImpostoDeRenda from "./componentes/TabelasDeImpostoDeRenda";
import ModalDeEntrada from "./componentes/ModalDeEntrada.vue";
import Rodape from "./componentes/Rodape.vue";

export default {
    name: 'app',
    data () {
        return {
            tabelasBase: TabelasDeImpostoDeRenda,
            resultados : [],
            salario: null
        }
    },
    computed: {
        cores: function() {
            return [this.resultados.map(tabela => tabela.cor)];
        },
        grafico: function () {
            return this.resultados.map(tabela => [tabela.nome, tabela.impostoDevido]);
        },
        salarioEmTexto: function() {
            const toDotNotation = (text) => {
                return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            };
            return `Salário: R$ ${this.salario === null ? 0 : toDotNotation(this.salario) },00` ;
        }
    },
    components: {
        "rodape": Rodape,
        "modal-de-entrada" : ModalDeEntrada
    },
    methods: {
        calcularImposto() {
            const calculadoraParaTabelaVigente = new CalculadoraDeImpostoDeRenda(this.tabelasBase.vigente.tabela);
            const impostoDevidoVigente = calculadoraParaTabelaVigente.calcular(this.salario);
            const vigente = {
                nome: this.tabelasBase.vigente.nome,
                impostoDevido: impostoDevidoVigente,
                cor: "#777",
                diferenca: 0,
            };

            this.resultados = [vigente];
            let vermelhos = ["hsl(7, 100%, 40%)", "hsl(7, 80%, 48%)", "hsl(7, 60%, 58%)"];
            let verdes = ["hsl(102, 100%, 25%)", "hsl(102, 80%, 33%)", "hsl(102, 60%, 43%)"];
            this.tabelasBase.propostas.forEach(tabela => {

                const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
                const impostoVigenteDessaProposta = calculadora.calcular(this.salario);
                const diferenca = impostoDevidoVigente - impostoVigenteDessaProposta;
                const cor = diferenca > 0 ? verdes.pop() : vermelhos.shift();

                const proposta = {
                    nome: tabela.nome,
                    impostoDevido: impostoVigenteDessaProposta,
                    cor,
                    diferenca,
                };

                this.resultados.push(proposta);
            });

        }
    }
}
</script>

<style lang="sass" src="bulma"></style>
