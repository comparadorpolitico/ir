<template>
    <div>
        <cabecalho></cabecalho>
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
            <etiquetas :etiquetas="etiquetas"></etiquetas>
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
import Etiquetas from "./componentes/Etiquetas.vue";
import Cabecalho from "./componentes/Cabecalho.vue";

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
        "etiquetas": Etiquetas,
        "rodape": Rodape,
        "cabecalho" : Cabecalho,
        "modal-de-entrada" : ModalDeEntrada
    },
    methods: {
        inserirPontuacao(texto) {
                return texto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        calcularImposto() {
            const cores = {
                vermelho: "#ff3860",
                verde: "#23d160",
                cinza: "#363636"
            };
            const calculadoraParaTabelaVigente = new CalculadoraDeImpostoDeRenda(this.tabelasBase.vigente.tabela);
            const impostoDevidoVigente = calculadoraParaTabelaVigente.calcular(this.salario);
            const vigente = {
                nome: this.tabelasBase.vigente.nome,
                eVigente: true,
                impostoDevido: impostoDevidoVigente,
                cor: cores.cinza,
                diferenca: 0,
            };
            this.resultados = [vigente];
            this.tabelasBase.propostas.forEach(tabela => {

                const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
                const impostoVigenteDessaProposta = calculadora.calcular(this.salario);
                const diferenca = impostoDevidoVigente - impostoVigenteDessaProposta;
                const cor = diferenca > 0 ? cores.verde : cores.vermelho;

                const proposta = {
                    nome: tabela.nome,
                    impostoDevido: impostoVigenteDessaProposta,
                    eVigente: false,
                    temDesconto: diferenca >= 0,
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
