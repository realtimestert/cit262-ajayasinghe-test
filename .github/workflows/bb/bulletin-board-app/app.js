new Vue({
  el: '#events',

  data: {
    event: { id: '', title: '', detail: '', date: '' },
    events: []
  },

  created: function () {
    this.fetchEvents();
  },

  methods: {
    fetchEvents: function () {
      this.$http.get('/api/events')
        .then(response => {
          this.events = response.data;
          console.log(this.events);
        })
        .catch(error => {
          console.log(error);
        });
    },

    addEvent: function () {
      if (this.event.title.trim() && this.event.detail.trim() && this.event.date.trim()) {
        // Generate a unique numeric ID for the new event
        this.event.id = this.generateUniqueId();

        this.$http.post('/api/events', this.event)
          .then(response => {
            this.events.push(this.event);
            console.log('Event added!');
            // Reset the event form
            this.event = { id: '', title: '', detail: '', date: '' };
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("All fields are required!");
      }
    },

    deleteEvent: function (id) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.$http.delete('/api/events/' + id)
          .then(response => {
            console.log(response);
            const index = this.events.findIndex(event => event.id === id);
            if (index !== -1) {
              this.events.splice(index, 1);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    generateUniqueId: function () {
      return Math.floor(Math.random() * 1000000); // Generates a random integer between 0 and 999999
    }
    
  }
});
