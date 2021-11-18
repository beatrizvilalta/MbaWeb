<template>
    <div>
        <h1>This is {{title}}</h1>
        <p> 
            Atributos:  <br>             
            value - double <br> 
            relative_date - date <br> 
            observation - string <br>
        
        </p>

        <form action="/action_page.php">
        <label for="fname">First name:</label><br>
        <input type="text" id="fname" name="fname" value="John"><br>
        <label for="lname">Last name:</label><br>
        <input type="text" id="lname" name="lname" value="Doe"><br><br>
        <input type="submit" value="Submit">
        </form> 
    </div>
    
</template>

<script>
export default {
    props: {
        paymentId: Number
    },
    mounted () {
        this.setupView()        
    },
    created () {
        
    },
    data() {
        return {
            title: ""
        };
    },
    methods: {    
        setupView() {
            if (this.$route.params.paymentId == null) {
                this.title = "Add payment for user " + this.$session.get("userid")
            } else {
                this.title = "Edit payment for user " + this.$session.get("userid") + " And paymentId id " + this.$route.params.paymentId
            }
        }    
    }
}
</script>