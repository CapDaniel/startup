var Movie = (function()
{
    function Movie()
    {    
        var Attributes = {};
        var Actors = new Array();
        this.set = function(attr, value)
        {
            Attributes[attr] = value;
        }
        this.get = function(attr)
        {
            return Attributes[attr];
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
        $(this).trigger("Playing");
        return this;
    }
    Movie.prototype.stop = function()
    {
        $(this).trigger("Stopped");
        return this;
    }
    return Movie;
})();

/* -------------------- MOVIE OBSERVER -------------------- */
var MovieObserver = function(Movie)
{
    $(Movie).on("Playing", function()
    {
        console.log("[MovieObserver] Playing " + this.get("Title"));
    });
    $(Movie).on("Stopped", function()
    {
        console.log("[MovieObserver] Stopped " + this.get("Title"));
    });
}

/* -------------------- DOWNLOADABLE MOVIE -------------------- */
function DownloadableMovie(Title)
{
    this.constructor(Title);
}
DownloadableMovie.prototype = new Movie();
DownloadableMovie.prototype.download = function()
{
    console.log("Downloading " + this.get("Title"));
    return this;
};

/* -------------------- MIXIN -------------------- */
function mixin(dest, Source)
{
    for (var i in Source)
    {
        if (source.hasOwnProperty(i))
        {
            dest[i] = Source[i];
        }
    }
    return dest;
}
var Social = 
{
    share: function(FriendName)
    {
        console.log("Sharing " + this.get("Title") + " with " + FriendName);
    },
    like: function()
    {
        console.log("Liked " + this.get("Title"));
    }
};

// Mixin
mixin(Movie.prototype, Social);


/* -------------------- ACTOR -------------------- */
var Actor = function(Name)
{
    var Name = Name;
    this.getName = function ()
    {
        return Name;
    }
}
var Titanic = new Movie();
var TitanicObserver = new MovieObserver(titanic);
var Terminator = new Movie();
var TerminatorObserver = new MovieObserver(terminator);
// Downloadable
var Thor = new DownloadableMovie();
var ThorObserver = new MovieObserver(thor);
// Actors
var Leonardo = new Actor("Leonardo DiCaprio");
var Kate = new Actor("Kate Winslet");
$(document).ready(function()
{
    Titanic.set("title", "Titanic");
    Terminator.set("title", "Terminator");
    Thor.set("title", "Thor");
    Titanic.play();
    Terminator.stop();
    // Actors
    Titanic.addActor(Leonardo);
    Titanic.addActor(Kate);
    Titanic.showActors();
});