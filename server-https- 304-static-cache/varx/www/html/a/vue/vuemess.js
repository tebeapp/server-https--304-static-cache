const App = {
    data() {
        return {
            counter: 55,
            placeholderString: 'Новое сообщение',
            title: 'Входящие',
            inputValue: '',
            noties: ['Сообщение 1','Сообщение 2','Сообщение 3','Сообщение 4']
        }
    },

    methods: {
        inputChangeHandler(event) {
            console.log('good')
            this.inputValue = event.target.value
        },
        addNewNote() {
            this.noties.push(this.inputValue)
            
            this.inputValue = null
        }
    
    }
}



const app = Vue.createApp(App)
app.mount('#app')