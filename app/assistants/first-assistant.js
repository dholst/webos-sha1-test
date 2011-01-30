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
      var result = hex_sha1("abc")
      var count = this.results[result] || 0
      this.results[result] = (count + 1)
      var div = this.controller.get("results")
      div.update("<table>")

      for(var r in this.results) {
        if(this.results.hasOwnProperty(r)) {
          div.insert('<tr><td class="count">' + this.results[r] + '</td><td>' + r.substr(0,16) + '</td></tr>')
        }
      }

      div.insert("</table>")

      setTimeout(this.calculateSha1.bind(this, iteration + 1), 10)
    }
  },

  stop: function() {
    this.stillGoing = false
  }
})
