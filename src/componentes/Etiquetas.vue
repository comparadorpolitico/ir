<template>
    <div>
        <div v-for="etiqueta in etiquetas" class="tags has-addons"
             v-bind:class="etiqueta.eVigente ? 'tags--vigente' : 'p-margin-0' ">
            <span v-bind:class="etiqueta.eVigente ? 'tag is-dark' : etiqueta.temDesconto ? 'tag is-success' : 'tag is-danger'">{{etiqueta.nome}}</span>
            <span class="tag is-light">
                <span class="has-text-weight-semibold">{{ etiqueta.texto }}</span>
            </span>
        </div>
    </div>
</template>
<style>

.tags--vigente {
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
}
.p-margin-0 {
    margin: 0 !important;
}
.tags--vigente + .tags {
    margin-top: 20px;
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