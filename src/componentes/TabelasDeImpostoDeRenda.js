const salarioMinimo = 954;
const TabelasDeImpostoDeRenda = {
    vigente: {
        nome: "Hoje",
        tabela: [
            {
                nome: "Isento",
                base: 0,
                aliquota: 0
            }, {
                nome: "7,5%",
                base: 1903.99,
                aliquota: 0.075
            }, {
                nome: "15%",
                base: 2826.67,
                aliquota: 0.15
            }, {
                nome: "22,5%",
                base: 3751.06,
                aliquota: 0.225
            },{
                nome: "27,5%",
                base: 4664.69,
                aliquota: 0.27
            }
        ]},
    propostas: [
        {
            nome: "Bolsonaro",
            tabela:  [{
                nome: "Isentos",
                base: 0,
                aliquota: 0
            }, {
                nome: "20%",
                base: salarioMinimo * 5,
                aliquota: 0.2
            }]
        },{
            nome: "Sindifisco",
            tabela: [
                {
                    nome: "Isento",
                    base: 0,
                    aliquota: 0
                }, {
                    nome: "7,5%",
                    base: 3556.56,
                    aliquota: 0.075
                }, {
                    nome: "15%",
                    base: 5280.09,
                    aliquota: 0.15
                }, {
                    nome: "22,5%",
                    base: 7073.23,
                    aliquota: 0.225
                },{
                    nome: "27,5%",
                    base: 8837.92,
                    aliquota: 0.27
                }
            ]},{
            nome: "Proposta PT",
            tabela: [{
                nome: "Isento",
                base: 0,
                aliquota: 0
            },{
                nome: "5%",
                base: 3390.01,
                aliquota: 0.05
            },{
                nome: "10%",
                base: 6780.01,
                aliquota: 0.1
            },{
                nome: "15%",
                base: 10170.01,
                aliquota: 0.15
            },{
                nome: "20%",
                base: 13560.01,
                aliquota: 0.2
            }, {
                nome: "30%",
                base: 27120.01,
                aliquota: 0.3
            }, {
                nome: "40%",
                base: 108480.01,
                aliquota: 0.4
            }]
        }
    ]
};

export default TabelasDeImpostoDeRenda;
