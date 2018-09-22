const TabelasDeImpostoDeRenda = [{
    nome: "Tabela de Paulo Guedes",
    tabela:  [{
        nome: "Valor único",
        base: 0,
        aliquota: 0.2
        }]
    },{
    nome: "Tabela atual - 2018",
    tabela: [
        {
            nome: "Isento",
            base: 0,
            aliquota: 0
        }, {
            nome: "7,5%",
            base: 190399,
            aliquota: 0.075
        }, {
            nome: "15%",
            base: 282667,
            aliquota: 0.15
        }, {
            nome: "22,5%",
            base: 375106,
            aliquota: 0.225
        },{
            nome: "27,5%",
            base: 466469,
            aliquota: 0.27
        }
    ]},{
    nome: "Tabela atualizada - Sindifisco",
    tabela: [
        {
            nome: "Isento",
            base: 0,
            aliquota: 0
        }, {
            nome: "7,5%",
            base: 355656,
            aliquota: 0.075
        }, {
            nome: "15%",
            base: 528009,
            aliquota: 0.15
        }, {
            nome: "22,5%",
            base: 707323,
            aliquota: 0.225
        },{
            nome: "27,5%",
            base: 883792,
            aliquota: 0.27
        }
    ]},{
    nome: "Proposta da bancada do PT",
    tabela: [{
        nome: "Isento",
        base: 0,
        aliquota: 0
    },{
        nome: "5%",
        base: 339001,
        aliquota: 0.05
    },{
        nome: "10%",
        base: 678001,
        aliquota: 0.1
    },{
        nome: "15%",
        base: 1017001,
        aliquota: 0.15
    },{
        nome: "20%",
        base: 1356001,
        aliquota: 0.2
    }, {
        nome: "30%",
        base: 2712001,
        aliquota: 0.3
    }, {
        nome: "40%",
        base: 10848001,
        aliquota: 0.4
    }]
}];
export default TabelasDeImpostoDeRenda;