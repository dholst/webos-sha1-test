var FirstAssistant = Class.create({
  initialize: function() {
    this.results = {}
  },

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
      var sha1 = core_sha1([1,2,3,4,5], 160)
      var result = "" + sha1[0]
      var count = this.results[result] || 0
      this.results[result] = (count + 1)
      var div = this.controller.get("results")
      div.update("<table>")

      for(var r in this.results) {
        if(this.results.hasOwnProperty(r)) {
          div.insert('<tr><td class="count">' + this.results[r] + '</td><td>' + r + '</td></tr>')
        }
      }

      div.insert("</table>")

      setTimeout(this.calculateSha1.bind(this, iteration + 1), 100)
    }
  },

  stop: function() {
    this.stillGoing = false
  }
})
