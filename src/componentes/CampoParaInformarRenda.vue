<template>
    <div class="field">
        <label class="label">Renda / Salário </label>
        <div class="control">
            <div class="control has-icons-left has-icons-right">
                <input  placeholder="Renda"
                        @input="definirSalario"
                        v-mask="'money'"
                        class="input is-large">
                <span class="icon is-left"><span>R&dollar;</span></span>
            </div>
        </div>
    </div>
</template>

<script>
import AwesomeMask from "awesome-mask"
export default {
    name: "CampoParaInformarRenda",
    directives: {
        'mask': AwesomeMask
    },
    data () {
        return {}
    },
    methods: {
        definirSalario: function (evento) {
            this.$store.commit("definirSalario", evento.target.value);
        }
    }
}
</script>