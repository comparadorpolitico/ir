class CalculadoraDeImpostoDeRenda {

    constructor(tabela) {
        this.tabela = tabela;
    }

    calcular (salario) {
        return this.tabela.reduce((total, atual, indice, tabela) => {
            const proximaBase = tabela[indice + 1] === undefined ? Infinity : tabela[indice + 1].base;
            const salarioExcedente = Math.min(proximaBase, salario);
            const intervalo =  Math.max(salarioExcedente - atual.base, 0);
            return Math.round(total + intervalo * atual.aliquota);
        }, 0);
    }
}

export default CalculadoraDeImpostoDeRenda;