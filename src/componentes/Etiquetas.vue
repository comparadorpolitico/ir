<template>
    <div class="field is-grouped is-grouped-multiline">
        <div class="field-label is-normal"><label class="label"></label></div>

        <div class="control" v-for="etiqueta in etiquetas">
            <div class="tags has-addons" title="Clique para saber mais">
                <span class="tag is-light">{{etiqueta.nome}}</span>
                <span v-bind:class="etiqueta.temDesconto || etiqueta.eIsento ? 'tag is-success' : 'tag is-danger'">
                    <span>{{ etiqueta.texto }}</span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ["etiquetas"],
        data() {
            return {}
        }
    }
</script>