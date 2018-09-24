<template>
    <div>
        <div v-for="etiqueta in etiquetas" class="tags has-addons"
             v-bind:class="etiqueta.eVigente ? 'tags--vigente' : '' ">
            <span class="tag is-light">{{etiqueta.nome}}</span>
            <span v-bind:class="etiqueta.eVigente ? 'tag is-dark' : etiqueta.temDesconto ? 'tag is-success' : 'tag is-danger'">
                <span>{{ etiqueta.texto }}</span>
            </span>
        </div>
    </div>
</template>
<style>

.tags--vigente {
    border-bottom: 1px solid #e5e5e5;
}

.tags--vigente + .tags {
    margin-top: 10px;
}


</style>
<script>
    export default {
        props: ["etiquetas"],
        data() {
            return {}
        }
    }
</script>