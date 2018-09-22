<template>
  <div id="app">
      <input v-model="salario" placeholder="400000">

      <p>Com salário de {{ salario }}.</p>

      <div v-for="tabela in tabelas">
          {{tabela.nome}} : {{ calcularImposto(tabela, salario) }}
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
            salario: 400000
        }
    },
    methods: {
        calcularImposto(tabela, salario) {
            const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
            return calculadora.calcular(salario);
        }
    }
}
</script>

<style lang="sass"></style>
