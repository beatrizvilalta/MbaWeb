<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ username }}
            </p>
            
            <div class="card-header-icon">
                <span class="tag is-success">Em dia</span>
            </div>
        </header>

        <div class="card-content">
            <div class="content">      
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    props: {
        username: String
    },
    data() {
        return {

        }
    },
}
</script>

<style>

</style>