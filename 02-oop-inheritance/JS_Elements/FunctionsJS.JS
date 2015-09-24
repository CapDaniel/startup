/*--Constructor--*/
var Movie = (function()
{
    function Movie()
    {
        var Attributes = {};
        var Actors = new Array();
        /*
        * try to use "set"  like a prefix and add the name of the value you will set. The same for "get".
         */
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
    // construct of what ?
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
// Why use jQuery?
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
    /*
    * Javascript is case sensitive !!
    * this error is common, so use lowercase to name variables in JS. Pay attention to the "S"
     */
    for (var i in Source)
    {
        if (Source.hasOwnProperty(i))
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
// pay attention to names, Titanic != titanic !!!
var TitanicObserver = new MovieObserver(Titanic);
var Terminator = new Movie();
// pay attention to names, Terminator != terminator !!!
var TerminatorObserver = new MovieObserver(Terminator);
// Downloadable
var Thor = new DownloadableMovie();
// pay attention to names, Thor != thor !!!
var ThorObserver = new MovieObserver(Thor);
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
