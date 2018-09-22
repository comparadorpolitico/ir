<template>
    <div>
        <section class="hero is-light">
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
                        <p class="control">
                            <input v-model="salario" placeholder="Informe sua renda mensal atual aqui" class="input">
                        </p>
                    </div>
                </div>
            </div>

            <bar-chart :data="grafico" :colors="[['#2ecc71', '#9b59b6', '#bdc3c7', '#e74c3c']]" :download="true"></bar-chart>

            <section class="message is-light" v-show="salario !== null" style="margin-top:30px">
                <div class="message-header">
                    <p>Resultado</p>
                </div>
                <div class="message-body">
                    <p v-show="salario !== null ">Com salário de {{ salario }}.</p>
                    <div v-for="tabela in tabelas">
                        {{tabela.nome}} : {{ calcularImposto(tabela, salario) }}
                    </div>
                </div>
            </section>


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
            salario: null
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
