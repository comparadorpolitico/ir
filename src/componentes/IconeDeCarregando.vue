<template>
    <div class="circulo-girando"></div>
</template>
<style>
    @keyframes circulo-girando {
        to {transform: rotate(360deg);}
    }

    .circulo-girando:before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        border-radius: 50%;
        border: 2px solid rgba(256, 256, 256, .3);
        border-top-color: rgba(256, 256, 256, .8);
        animation: circulo-girando .6s linear infinite;
    }

</style>