<template>
    <div>
        <section class="hero is-primary">
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
        </section>
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

            <bar-chart :data="grafico"
                       :colors="cores"
                       :download="true"
                       decimal=","
                       prefix="R$"></bar-chart>
        </div>
    </div>

</template>

<script>
import CalculadoraDeImpostoDeRenda from "./componentes/CalculadoraDeImpostoDeRenda";
import TabelasDeImpostoDeRenda from "./componentes/TabelasDeImpostoDeRenda";

export default {
    name: 'app',
    data () {
        return {
            cores: [["#00a8ff", "#fbc531", "#44bd32", "#ff7f50"]],
            tabelas: TabelasDeImpostoDeRenda,
            grafico: [],
            salario: null
        }
    },
    methods: {
        calcularImposto() {

            this.tabelas.forEach(tabela => {
                const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
                const impostoDevido = calculadora.calcular(this.salario);
                this.grafico.push([tabela.nome, impostoDevido]);
                return impostoDevido;
            });

        }
    }
}
</script>

<style lang="sass" src="bulma"></style>
