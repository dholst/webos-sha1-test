var FirstAssistant = Class.create({
  setup: function() {
    this.controller.listen("start", Mojo.Event.tap, this.start = this.start.bind(this))
    this.controller.listen("stop", Mojo.Event.tap, this.stop = this.stop.bind(this))
  },

  start: function() {
    this.stillGoing = true
    this.calculateSha1(1)
  },

  calculateSha1: function(iteration) {
    if(this.stillGoing) {
      console.log(core_sha1([1,2,3,4,5], 160))
      this.controller.get("results").update(iteration)
      setTimeout(this.calculateSha1.bind(this, iteration + 1), 100)
    }
  },

  stop: function() {
    this.stillGoing = false
  }
})
