<template>
    <div class="field">
        <label class="label">Renda / Salário </label>
        <div class="control">
            <div class="control has-icons-left has-icons-right">
                <input placeholder="Renda"
                       @input="definirSalario"
                       class="input is-large">
                <span class="icon is-left"><span>R&dollar;</span></span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "CampoParaInformarRenda",
    data () {
        return {}
    },
    methods: {
        definirSalario: function (evento) {
            this.$store.commit("definirSalario", evento.target.value);
            console.log(this.$store.state.salario);
        }
    }
}
</script>