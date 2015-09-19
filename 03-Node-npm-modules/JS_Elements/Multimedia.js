define(function()
{
  // Constructor
  function Movie() 
  {    
    // Attributes
    var attributes = {};
    var Actors = new Array();
    this.set = function(attr, value)
    {
      attributes[attr] = value;
    }
    this.get = function(attr)
    {
      return attributes[attr];
    }
    this.addActor = function(Actor)
    {
      Actors[Actors.length] = Actor;
    }
    this.showActors = function()
    {
      console.log("Actors of " + this.get("Title") + ":");
      for (var i in Actors)
      {
        console.log(" - " + Actors[i].getName());
      }
    }
  }
  // Methods
  Movie.prototype.constructor = Movie;
  Movie.prototype.play = function()
  {   
    console.log("Playing " + this.get("Title"))
    return this;
  }
  Movie.prototype.stop = function()
  {
    console.log("Stopped " + this.get("Title"));
    return this;
  }
  return
  {
    Movie : Movie
  };
});