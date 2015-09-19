define(['Multimedia', 'Director'], function(Multimedia, Director)
{
	var Terminator = new Multimedia.Movie();
  	Terminator.set("Title", "Terminator");
	var Titanic = new Multimedia.Movie();
	Titanic.set("Title", "Titanic");
	Titanic.play();
	var James = new Director.Director("James Cameron");
	James.addQuote("People call me a perfectionist, but i'm not. I'm a rightist. I do something until it's right, and then, i move on to the next thing.");
	James.addQuote("If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.");
	Titanic.set("Director", James);
	Titanic.get("Director").speak();
});