import CalculadoraDeImpostoDeRenda from "./CalculadoraDeImpostoDeRenda";

const QuizStore = {
    state: {
        salario: null,
        resultados: [],
        jaCalculouUmaVez: false,
    },
    mutations: {
        registraPrimeiroCalculo(state){
            state.jaCalculouUmaVez = true;
        },
        definirSalario (state, salario) {
            state.salario = salario;
        },
        calcularImpostoDeRendaIndividual (state, {tabelas, salario} ) {
            const cores = {
                vermelho: "#ff3860",
                verde: "#23d160",
                cinza: "#363636"
            };
            const calculadoraParaTabelaVigente = new CalculadoraDeImpostoDeRenda(tabelas.vigente.tabela);
            const impostoDevidoVigente = calculadoraParaTabelaVigente.calcular(salario);
            const vigente = {
                nome: tabelas.vigente.nome,
                eVigente: true,
                impostoDevido: impostoDevidoVigente,
                cor: cores.cinza,
                diferenca: 0,
            };
            let resultados = [vigente];
            tabelas.propostas.forEach(tabela => {

                const calculadora = new CalculadoraDeImpostoDeRenda(tabela.tabela);
                const impostoVigenteDessaProposta = calculadora.calcular(salario);
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

                resultados.push(proposta);
            });
            state.resultados = resultados;
        }

    }
};
export default QuizStore;