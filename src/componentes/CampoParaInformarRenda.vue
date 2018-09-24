<template>
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
                    <span class="icon is-small is-left"><span>R&dollar;</span></span>
                </div>
            </div>
        </div>
    </div>
</template>