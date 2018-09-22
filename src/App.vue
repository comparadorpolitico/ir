<template>
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Comparador de Imposto de Renda
                    </h1>
                    <h2 class="subtitle">
                        Descubra quanto você paga hoje e quanto pagaria de acordo com várias propostas de alteração da tabela do imposto de renda.
                    </h2>
                </div>
            </div>
        </section>
        <div class="container section" id="app">

            <input v-model="salario" placeholder="400000">

            <p>Com salário de {{ salario }}.</p>

            <column-chart :data="grafico" width="100%"></column-chart>

            <div class="notification">
                <div v-for="tabela in tabelas">
                    {{tabela.nome}} : {{ calcularImposto(tabela, salario) }}
                </div>
            </div>
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
            tabelas: TabelasDeImpostoDeRenda,
            grafico: [],
            salario: 150000
        }
    },
    methods: {
        calcularImposto(tabela, salario) {
            const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
            const impostoDevido = calculadora.calcular(salario);
            this.grafico.push([tabela.nome, impostoDevido]);
            return impostoDevido;
        }
    }
}
</script>

<style lang="sass" src="bulma"></style>
